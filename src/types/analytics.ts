// ============================================================
// Analytics Types for Dashboard Charts & AI Features
// ============================================================

export interface KPIMetric {
  label: string;
  value: number | string;
  change: number; // percentage change
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
}

export interface SkillDemand {
  skill: string;
  count: number;
  growth: number;
  category: string;
  avgSalary: number;
}

export interface SalaryByCity {
  city: string;
  avgSalary: number;
  medianSalary: number;
  maxSalary: number;
  minSalary: number;
  jobCount: number;
}

export interface SalaryByExperience {
  experience: string;
  avgSalary: number;
  medianSalary: number;
  count: number;
}

export interface SalaryBySkill {
  skill: string;
  avgSalary: number;
  medianSalary: number;
  maxSalary: number;
}

export interface MonthlyTrend {
  month: string;
  jobs: number;
  internships: number;
  companies: number;
}

export interface CityAnalytics {
  city: string;
  jobCount: number;
  avgSalary: number;
  topSkills: string[];
  internshipCount: number;
  growthRate: number;
  lat: number;
  lng: number;
}

export interface InternshipAnalytics {
  category: string;
  count: number;
  avgStipend: number;
  remotePercentage: number;
}

export interface CompanyAnalytics {
  company: string;
  jobCount: number;
  avgSalary: number;
  industry: string;
  growthRate: number;
  rating: number;
}

export interface SkillGapInput {
  currentSkills: string[];
  desiredRole: string;
}

export interface SkillGapResult {
  missingSkills: {
    name: string;
    priority: 'critical' | 'important' | 'nice-to-have';
    estimatedTime: string;
    resources: string[];
  }[];
  learningRoadmap: {
    phase: number;
    title: string;
    duration: string;
    skills: string[];
    description: string;
  }[];
  overallReadiness: number;
  matchingSkills: string[];
}

export interface CareerInput {
  skills: string[];
  interests: string[];
  experienceLevel: string;
}

export interface ResumeAnalysisResult {
  atsScore: number;
  qualityScore: number;
  summary: string;
  extractedSkills: string[];
  missingKeywords: string[];
  improvements: {
    category: string;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
    impact: string;
  }[];
  strengths: string[];
  weaknesses: string[];
}

export interface AIInsight {
  title: string;
  content: string;
  category: string;
  confidence: number;
}

export interface FilterState {
  city: string;
  skill: string;
  experience: string;
  jobType: string;
  salaryRange: [number, number];
  dateRange: string;
  isRemote: boolean | null;
}
