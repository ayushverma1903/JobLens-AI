-- ============================================================
-- AI-Powered Job Market Intelligence Dashboard
-- Supabase PostgreSQL Schema
-- ============================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PROFILES (extends auth.users)
-- ============================================================
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
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 2. COMPANIES
-- ============================================================
CREATE TABLE public.companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  size TEXT CHECK (size IN ('startup', 'small', 'medium', 'large', 'enterprise')),
  headquarters TEXT,
  website TEXT,
  logo_url TEXT,
  description TEXT,
  founded_year INTEGER,
  employee_count INTEGER,
  rating DECIMAL(2,1),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Admins can manage companies" ON public.companies FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================================
-- 3. SKILLS
-- ============================================================
CREATE TABLE public.skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  category TEXT CHECK (category IN ('programming', 'data', 'cloud', 'design', 'management', 'soft_skills', 'tools', 'frameworks', 'database', 'other')),
  demand_score INTEGER DEFAULT 0,
  growth_rate DECIMAL(5,2) DEFAULT 0,
  avg_salary DECIMAL(12,2),
  is_trending BOOLEAN DEFAULT false,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Admins can manage skills" ON public.skills FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================================
-- 4. JOBS
-- ============================================================
CREATE TABLE public.jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  company_name TEXT,
  location TEXT,
  city TEXT,
  state TEXT,
  job_type TEXT CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship', 'freelance')),
  experience_level TEXT CHECK (experience_level IN ('fresher', 'junior', 'mid', 'senior', 'lead', 'executive')),
  experience_min INTEGER DEFAULT 0,
  experience_max INTEGER,
  salary_min DECIMAL(12,2),
  salary_max DECIMAL(12,2),
  salary_currency TEXT DEFAULT 'INR',
  description TEXT,
  requirements TEXT[],
  is_remote BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  source TEXT,
  posted_date DATE DEFAULT CURRENT_DATE,
  closing_date DATE,
  applicant_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active jobs" ON public.jobs FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage jobs" ON public.jobs FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================================
-- 5. JOB_SKILLS (many-to-many)
-- ============================================================
CREATE TABLE public.job_skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  is_required BOOLEAN DEFAULT true,
  UNIQUE(job_id, skill_id)
);

ALTER TABLE public.job_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view job skills" ON public.job_skills FOR SELECT USING (true);

-- ============================================================
-- 6. SALARY_DATA
-- ============================================================
CREATE TABLE public.salary_data (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  role_title TEXT NOT NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  company_name TEXT,
  city TEXT,
  experience_years INTEGER,
  experience_level TEXT,
  salary_annual DECIMAL(12,2),
  salary_monthly DECIMAL(12,2),
  industry TEXT,
  skill_primary TEXT,
  source TEXT,
  report_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.salary_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view salary data" ON public.salary_data FOR SELECT USING (true);
CREATE POLICY "Admins can manage salary data" ON public.salary_data FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================================
-- 7. INTERNSHIPS
-- ============================================================
CREATE TABLE public.internships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  company_name TEXT,
  location TEXT,
  city TEXT,
  category TEXT,
  stipend_min DECIMAL(10,2),
  stipend_max DECIMAL(10,2),
  duration_months INTEGER,
  is_remote BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  requirements TEXT[],
  description TEXT,
  applicant_count INTEGER DEFAULT 0,
  posted_date DATE DEFAULT CURRENT_DATE,
  start_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view internships" ON public.internships FOR SELECT USING (true);
CREATE POLICY "Admins can manage internships" ON public.internships FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================================
-- 8. RESUME_ANALYSES
-- ============================================================
CREATE TABLE public.resume_analyses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT,
  file_size INTEGER,
  ats_score INTEGER CHECK (ats_score >= 0 AND ats_score <= 100),
  quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
  summary TEXT,
  extracted_skills TEXT[],
  missing_keywords TEXT[],
  improvement_suggestions JSONB,
  experience_detected TEXT,
  education_detected TEXT,
  raw_analysis JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.resume_analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own analyses" ON public.resume_analyses
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own analyses" ON public.resume_analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- 9. CAREER_RECOMMENDATIONS
-- ============================================================
CREATE TABLE public.career_recommendations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  input_skills TEXT[],
  input_interests TEXT[],
  input_experience_level TEXT,
  recommended_paths JSONB,
  salary_expectations JSONB,
  certifications JSONB,
  learning_roadmap JSONB,
  raw_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.career_recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own recommendations" ON public.career_recommendations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own recommendations" ON public.career_recommendations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- 10. ANALYTICS_LOGS
-- ============================================================
CREATE TABLE public.analytics_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_type TEXT NOT NULL,
  event_data JSONB,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  page TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.analytics_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert their own logs" ON public.analytics_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all logs" ON public.analytics_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 11. SAVED_JOBS
-- ============================================================
CREATE TABLE public.saved_jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their saved jobs" ON public.saved_jobs
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- 12. USER_ACTIVITY
-- ============================================================
CREATE TABLE public.user_activity (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own activity" ON public.user_activity
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own activity" ON public.user_activity
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- 13. NOTIFICATIONS
-- ============================================================
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX idx_jobs_city ON public.jobs(city);
CREATE INDEX idx_jobs_type ON public.jobs(job_type);
CREATE INDEX idx_jobs_posted ON public.jobs(posted_date DESC);
CREATE INDEX idx_jobs_company ON public.jobs(company_id);
CREATE INDEX idx_salary_city ON public.salary_data(city);
CREATE INDEX idx_salary_role ON public.salary_data(role_title);
CREATE INDEX idx_salary_experience ON public.salary_data(experience_years);
CREATE INDEX idx_internships_city ON public.internships(city);
CREATE INDEX idx_internships_category ON public.internships(category);
CREATE INDEX idx_job_skills_job ON public.job_skills(job_id);
CREATE INDEX idx_job_skills_skill ON public.job_skills(skill_id);
CREATE INDEX idx_resume_user ON public.resume_analyses(user_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read);

-- ============================================================
-- STORAGE BUCKETS (run in Supabase dashboard or via API)
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('reports', 'reports', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('datasets', 'datasets', false);

-- Storage policies
-- CREATE POLICY "Users can upload their own resumes" ON storage.objects
--   FOR INSERT WITH CHECK (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);
-- CREATE POLICY "Users can view their own resumes" ON storage.objects
--   FOR SELECT USING (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);
