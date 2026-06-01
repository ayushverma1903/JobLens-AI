// ============================================================
// Database Types — matching Supabase schema
// ============================================================

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'user' | 'recruiter' | 'admin';
  bio: string | null;
  current_skills: string[] | null;
  experience_level: 'fresher' | 'junior' | 'mid' | 'senior' | 'lead' | null;
  location: string | null;
  phone: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string | null;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise' | null;
  headquarters: string | null;
  website: string | null;
  logo_url: string | null;
  description: string | null;
  founded_year: number | null;
  employee_count: number | null;
  rating: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'programming' | 'data' | 'cloud' | 'design' | 'management' | 'soft_skills' | 'tools' | 'frameworks' | 'database' | 'other';
  demand_score: number;
  growth_rate: number;
  avg_salary: number | null;
  is_trending: boolean;
  icon: string | null;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  company_id: string | null;
  company_name: string | null;
  location: string | null;
  city: string | null;
  state: string | null;
  job_type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  experience_level: 'fresher' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
  experience_min: number;
  experience_max: number | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  description: string | null;
  requirements: string[] | null;
  is_remote: boolean;
  is_active: boolean;
  source: string | null;
  posted_date: string;
  closing_date: string | null;
  applicant_count: number;
  created_at: string;
  updated_at: string;
}

export interface SalaryData {
  id: string;
  role_title: string;
  company_id: string | null;
  company_name: string | null;
  city: string | null;
  experience_years: number | null;
  experience_level: string | null;
  salary_annual: number | null;
  salary_monthly: number | null;
  industry: string | null;
  skill_primary: string | null;
  source: string | null;
  report_date: string;
  created_at: string;
}

export interface Internship {
  id: string;
  title: string;
  company_id: string | null;
  company_name: string | null;
  location: string | null;
  city: string | null;
  category: string | null;
  stipend_min: number | null;
  stipend_max: number | null;
  duration_months: number | null;
  is_remote: boolean;
  is_active: boolean;
  requirements: string[] | null;
  description: string | null;
  applicant_count: number;
  posted_date: string;
  start_date: string | null;
  created_at: string;
}

export interface ResumeAnalysis {
  id: string;
  user_id: string;
  file_name: string;
  file_url: string | null;
  file_size: number | null;
  ats_score: number | null;
  quality_score: number | null;
  summary: string | null;
  extracted_skills: string[] | null;
  missing_keywords: string[] | null;
  improvement_suggestions: ImprovementSuggestion[] | null;
  experience_detected: string | null;
  education_detected: string | null;
  raw_analysis: Record<string, unknown> | null;
  created_at: string;
}

export interface ImprovementSuggestion {
  category: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}

export interface CareerRecommendation {
  id: string;
  user_id: string;
  input_skills: string[];
  input_interests: string[];
  input_experience_level: string;
  recommended_paths: CareerPath[] | null;
  salary_expectations: Record<string, unknown> | null;
  certifications: CertificationRec[] | null;
  learning_roadmap: RoadmapStep[] | null;
  raw_response: Record<string, unknown> | null;
  created_at: string;
}

export interface CareerPath {
  title: string;
  description: string;
  match_score: number;
  salary_range: string;
  growth_outlook: string;
  key_skills: string[];
}

export interface CertificationRec {
  name: string;
  provider: string;
  url?: string;
  relevance: string;
}

export interface RoadmapStep {
  phase: number;
  title: string;
  duration: string;
  skills: string[];
  description: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string | null;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  action_url: string | null;
  created_at: string;
}
