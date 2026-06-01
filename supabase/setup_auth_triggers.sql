-- Run this script in your Supabase SQL Editor to enable real-time login tracking and correct schema profiles.

-- 1. Drop existing triggers and functions to prevent lock issues
DROP TRIGGER IF EXISTS on_auth_user_events ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;
DROP FUNCTION IF EXISTS public.handle_user_auth_events CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user CASCADE;

-- 2. Drop the mismatching profiles table (CASCADE automatically handles foreign key dependencies)
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 3. Recreate the profiles table with the COMPLETE correct schema
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'recruiter', 'admin')),
  bio TEXT,
  current_skills TEXT[],
  experience_level TEXT CHECK (experience_level IN ('fresher', 'junior', 'mid', 'senior', 'lead')),
  location TEXT,
  phone TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_sign_in_at TIMESTAMPTZ
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. Create core security policies and security definer function to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING ( public.is_admin(auth.uid()) );

-- 6. Create the unified trigger function
CREATE OR REPLACE FUNCTION public.handle_user_auth_events()
RETURNS trigger AS $$
BEGIN
  -- Handle new signups
  IF (TG_OP = 'INSERT') THEN
    INSERT INTO public.profiles (
      id, 
      email, 
      full_name, 
      avatar_url, 
      created_at, 
      last_sign_in_at
    )
    VALUES (
      new.id,
      new.email,
      COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
      COALESCE(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', ''),
      new.created_at,
      new.last_sign_in_at
    )
    ON CONFLICT (id) DO UPDATE 
    SET last_sign_in_at = EXCLUDED.last_sign_in_at;
  
  -- Handle logins (updates to auth.users)
  ELSIF (TG_OP = 'UPDATE') THEN
    IF (old.last_sign_in_at IS DISTINCT FROM new.last_sign_in_at) THEN
      UPDATE public.profiles
      SET last_sign_in_at = new.last_sign_in_at
      WHERE id = new.id;
    END IF;
  END IF;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Attach the trigger to auth.users
CREATE TRIGGER on_auth_user_events
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_auth_events();

-- 8. Enable Realtime subscriptions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'profiles'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
  END IF;
END
$$;
