-- Run this script in your Supabase SQL Editor

-- Create datasets table
CREATE TABLE IF NOT EXISTS public.datasets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    rows INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'processing',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Realtime for datasets
ALTER PUBLICATION supabase_realtime ADD TABLE datasets;

-- Create users table (optional, if you want a custom users table besides auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Realtime for profiles
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;

-- Insert some dummy data into datasets to start
INSERT INTO public.datasets (name, rows, status)
VALUES 
  ('jobs_june_2026.csv', 2450, 'processed'),
  ('salary_data_q2.xlsx', 1800, 'processed')
ON CONFLICT DO NOTHING;
