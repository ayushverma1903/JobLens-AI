// ============================================================
// Mock Data Service — Comprehensive Indian Job Market Data
// Used when Supabase is not configured or for demo mode
// ============================================================

import type {
  KPIMetric,
  SkillDemand,
  SalaryByCity,
  SalaryByExperience,
  SalaryBySkill,
  MonthlyTrend,
  CityAnalytics,
  InternshipAnalytics,
  CompanyAnalytics,
} from '@/types/analytics';

// ---- KPI Metrics ----
export const kpiMetrics: KPIMetric[] = [
  { label: 'Total Jobs', value: 24850, change: 12.5, trend: 'up', icon: 'Briefcase', color: 'indigo' },
  { label: 'Active Companies', value: 1240, change: 8.3, trend: 'up', icon: 'Building2', color: 'cyan' },
  { label: 'Internships', value: 3620, change: 15.2, trend: 'up', icon: 'GraduationCap', color: 'violet' },
  { label: 'Avg. Salary', value: '₹8.5 LPA', change: 6.7, trend: 'up', icon: 'IndianRupee', color: 'emerald' },
  { label: 'Top Skill', value: 'Python', change: 22.1, trend: 'up', icon: 'Zap', color: 'amber' },
  { label: 'Most Active City', value: 'Bangalore', change: 5.4, trend: 'up', icon: 'MapPin', color: 'rose' },
  { label: 'Highest Paying', value: 'AI/ML', change: 18.9, trend: 'up', icon: 'TrendingUp', color: 'green' },
  { label: 'Fastest Growing', value: 'GenAI', change: 45.2, trend: 'up', icon: 'Rocket', color: 'blue' },
];

// ---- Skill Demand ----
export const skillDemandData: SkillDemand[] = [
  { skill: 'Python', count: 8540, growth: 22.1, category: 'programming', avgSalary: 1000000 },
  { skill: 'SQL', count: 7820, growth: 15.3, category: 'database', avgSalary: 850000 },
  { skill: 'JavaScript', count: 6950, growth: 12.8, category: 'programming', avgSalary: 920000 },
  { skill: 'React', count: 5640, growth: 18.5, category: 'frameworks', avgSalary: 1100000 },
  { skill: 'Machine Learning', count: 4890, growth: 28.4, category: 'data', avgSalary: 1400000 },
  { skill: 'Power BI', count: 4320, growth: 25.6, category: 'tools', avgSalary: 780000 },
  { skill: 'Data Analytics', count: 4150, growth: 20.1, category: 'data', avgSalary: 850000 },
  { skill: 'Excel', count: 3980, growth: 5.2, category: 'tools', avgSalary: 600000 },
  { skill: 'Java', count: 3750, growth: 8.4, category: 'programming', avgSalary: 950000 },
  { skill: 'Tableau', count: 3420, growth: 19.8, category: 'tools', avgSalary: 820000 },
  { skill: 'AWS', count: 3280, growth: 24.5, category: 'cloud', avgSalary: 1200000 },
  { skill: 'Data Science', count: 3150, growth: 30.2, category: 'data', avgSalary: 1350000 },
  { skill: 'Node.js', count: 2980, growth: 14.7, category: 'frameworks', avgSalary: 980000 },
  { skill: 'TypeScript', count: 2850, growth: 35.6, category: 'programming', avgSalary: 1050000 },
  { skill: 'Docker', count: 2640, growth: 21.3, category: 'tools', avgSalary: 1100000 },
  { skill: 'TensorFlow', count: 2120, growth: 26.8, category: 'frameworks', avgSalary: 1500000 },
  { skill: 'GenAI / LLMs', count: 1980, growth: 85.4, category: 'data', avgSalary: 1800000 },
  { skill: 'Kubernetes', count: 1850, growth: 32.1, category: 'cloud', avgSalary: 1350000 },
  { skill: 'Next.js', count: 1720, growth: 45.2, category: 'frameworks', avgSalary: 1150000 },
  { skill: 'Flutter', count: 1540, growth: 28.9, category: 'frameworks', avgSalary: 900000 },
];

// ---- Salary by City ----
export const salaryByCityData: SalaryByCity[] = [
  { city: 'Bangalore', avgSalary: 1250000, medianSalary: 1050000, maxSalary: 5000000, minSalary: 350000, jobCount: 7820 },
  { city: 'Hyderabad', avgSalary: 1050000, medianSalary: 880000, maxSalary: 4200000, minSalary: 300000, jobCount: 4560 },
  { city: 'Pune', avgSalary: 980000, medianSalary: 820000, maxSalary: 3800000, minSalary: 300000, jobCount: 4120 },
  { city: 'Mumbai', avgSalary: 1150000, medianSalary: 950000, maxSalary: 4500000, minSalary: 350000, jobCount: 3980 },
  { city: 'Delhi NCR', avgSalary: 1100000, medianSalary: 900000, maxSalary: 4200000, minSalary: 320000, jobCount: 3650 },
  { city: 'Chennai', avgSalary: 920000, medianSalary: 780000, maxSalary: 3500000, minSalary: 280000, jobCount: 3240 },
  { city: 'Noida', avgSalary: 880000, medianSalary: 720000, maxSalary: 3200000, minSalary: 280000, jobCount: 2850 },
];

// ---- Salary by Experience ----
export const salaryByExperienceData: SalaryByExperience[] = [
  { experience: 'Fresher (0-1 yr)', avgSalary: 450000, medianSalary: 380000, count: 4520 },
  { experience: 'Junior (1-3 yr)', avgSalary: 720000, medianSalary: 650000, count: 6180 },
  { experience: 'Mid (3-5 yr)', avgSalary: 1200000, medianSalary: 1050000, count: 5430 },
  { experience: 'Senior (5-8 yr)', avgSalary: 1850000, medianSalary: 1600000, count: 4280 },
  { experience: 'Lead (8-12 yr)', avgSalary: 2600000, medianSalary: 2300000, count: 2650 },
  { experience: 'Executive (12+ yr)', avgSalary: 3800000, medianSalary: 3400000, count: 1790 },
];

// ---- Salary by Skill ----
export const salaryBySkillData: SalaryBySkill[] = [
  { skill: 'GenAI / LLMs', avgSalary: 1800000, medianSalary: 1500000, maxSalary: 5000000 },
  { skill: 'Machine Learning', avgSalary: 1400000, medianSalary: 1200000, maxSalary: 4500000 },
  { skill: 'Data Science', avgSalary: 1350000, medianSalary: 1100000, maxSalary: 4200000 },
  { skill: 'Kubernetes', avgSalary: 1350000, medianSalary: 1150000, maxSalary: 4000000 },
  { skill: 'AWS', avgSalary: 1200000, medianSalary: 1050000, maxSalary: 3800000 },
  { skill: 'React', avgSalary: 1100000, medianSalary: 950000, maxSalary: 3500000 },
  { skill: 'Python', avgSalary: 1000000, medianSalary: 850000, maxSalary: 3200000 },
  { skill: 'TypeScript', avgSalary: 1050000, medianSalary: 880000, maxSalary: 3300000 },
  { skill: 'Java', avgSalary: 950000, medianSalary: 800000, maxSalary: 3000000 },
  { skill: 'SQL', avgSalary: 850000, medianSalary: 720000, maxSalary: 2800000 },
];

// ---- Monthly Trends (Last 12 months) ----
export const monthlyTrendData: MonthlyTrend[] = [
  { month: 'Jul 2025', jobs: 18200, internships: 2800, companies: 980 },
  { month: 'Aug 2025', jobs: 19100, internships: 2650, companies: 1010 },
  { month: 'Sep 2025', jobs: 19800, internships: 2900, companies: 1040 },
  { month: 'Oct 2025', jobs: 20500, internships: 3100, companies: 1080 },
  { month: 'Nov 2025', jobs: 21200, internships: 2950, companies: 1100 },
  { month: 'Dec 2025', jobs: 20800, internships: 2700, companies: 1060 },
  { month: 'Jan 2026', jobs: 21900, internships: 3200, companies: 1120 },
  { month: 'Feb 2026', jobs: 22500, internships: 3350, companies: 1150 },
  { month: 'Mar 2026', jobs: 23100, internships: 3500, companies: 1180 },
  { month: 'Apr 2026', jobs: 23800, internships: 3450, companies: 1200 },
  { month: 'May 2026', jobs: 24300, internships: 3550, companies: 1220 },
  { month: 'Jun 2026', jobs: 24850, internships: 3620, companies: 1240 },
];

// ---- City Analytics ----
export const cityAnalyticsData: CityAnalytics[] = [
  { city: 'Bangalore', jobCount: 7820, avgSalary: 1250000, topSkills: ['Python', 'Java', 'React', 'AWS'], internshipCount: 1240, growthRate: 14.2, lat: 12.9716, lng: 77.5946 },
  { city: 'Hyderabad', jobCount: 4560, avgSalary: 1050000, topSkills: ['Python', 'SQL', 'Power BI', 'Java'], internshipCount: 680, growthRate: 18.5, lat: 17.385, lng: 78.4867 },
  { city: 'Pune', jobCount: 4120, avgSalary: 980000, topSkills: ['Python', 'React', 'Node.js', 'SQL'], internshipCount: 620, growthRate: 12.8, lat: 18.5204, lng: 73.8567 },
  { city: 'Mumbai', jobCount: 3980, avgSalary: 1150000, topSkills: ['Python', 'Excel', 'SQL', 'Tableau'], internshipCount: 540, growthRate: 10.5, lat: 19.076, lng: 72.8777 },
  { city: 'Delhi NCR', jobCount: 3650, avgSalary: 1100000, topSkills: ['Python', 'SQL', 'Power BI', 'Excel'], internshipCount: 480, growthRate: 11.2, lat: 28.7041, lng: 77.1025 },
  { city: 'Chennai', jobCount: 3240, avgSalary: 920000, topSkills: ['Java', 'Python', 'SQL', 'React'], internshipCount: 420, growthRate: 9.8, lat: 13.0827, lng: 80.2707 },
  { city: 'Noida', jobCount: 2850, avgSalary: 880000, topSkills: ['Python', 'Java', 'React', 'SQL'], internshipCount: 380, growthRate: 15.3, lat: 28.5355, lng: 77.391 },
];

// ---- Internship Analytics ----
export const internshipAnalyticsData: InternshipAnalytics[] = [
  { category: 'Data Science', count: 680, avgStipend: 25000, remotePercentage: 45 },
  { category: 'Web Development', count: 620, avgStipend: 18000, remotePercentage: 60 },
  { category: 'Machine Learning', count: 480, avgStipend: 30000, remotePercentage: 40 },
  { category: 'Business Analytics', count: 420, avgStipend: 20000, remotePercentage: 50 },
  { category: 'Mobile Development', count: 380, avgStipend: 22000, remotePercentage: 55 },
  { category: 'Cloud / DevOps', count: 340, avgStipend: 28000, remotePercentage: 35 },
  { category: 'UI/UX Design', count: 320, avgStipend: 15000, remotePercentage: 65 },
  { category: 'Digital Marketing', count: 280, avgStipend: 12000, remotePercentage: 70 },
  { category: 'Cybersecurity', count: 220, avgStipend: 32000, remotePercentage: 30 },
];

// ---- Company Analytics ----
export const companyAnalyticsData: CompanyAnalytics[] = [
  { company: 'TCS', jobCount: 2850, avgSalary: 780000, industry: 'IT Services', growthRate: 8.5, rating: 3.8 },
  { company: 'Infosys', jobCount: 2420, avgSalary: 820000, industry: 'IT Services', growthRate: 10.2, rating: 3.9 },
  { company: 'Wipro', jobCount: 1980, avgSalary: 750000, industry: 'IT Services', growthRate: 7.8, rating: 3.7 },
  { company: 'Google', jobCount: 580, avgSalary: 2800000, industry: 'Technology', growthRate: 15.4, rating: 4.5 },
  { company: 'Microsoft', jobCount: 620, avgSalary: 2500000, industry: 'Technology', growthRate: 12.8, rating: 4.4 },
  { company: 'Amazon', jobCount: 890, avgSalary: 2200000, industry: 'E-Commerce', growthRate: 18.5, rating: 4.1 },
  { company: 'Flipkart', jobCount: 450, avgSalary: 1800000, industry: 'E-Commerce', growthRate: 14.2, rating: 4.0 },
  { company: 'Accenture', jobCount: 1650, avgSalary: 880000, industry: 'Consulting', growthRate: 9.5, rating: 3.8 },
  { company: 'Cognizant', jobCount: 1420, avgSalary: 790000, industry: 'IT Services', growthRate: 8.2, rating: 3.6 },
  { company: 'HCL Tech', jobCount: 1380, avgSalary: 800000, industry: 'IT Services', growthRate: 9.8, rating: 3.7 },
  { company: 'Deloitte', jobCount: 720, avgSalary: 1200000, industry: 'Consulting', growthRate: 11.5, rating: 4.2 },
  { company: 'Razorpay', jobCount: 280, avgSalary: 2000000, industry: 'Fintech', growthRate: 25.8, rating: 4.3 },
  { company: 'Zerodha', jobCount: 120, avgSalary: 2200000, industry: 'Fintech', growthRate: 20.1, rating: 4.4 },
  { company: 'Swiggy', jobCount: 340, avgSalary: 1600000, industry: 'Food Tech', growthRate: 16.5, rating: 3.9 },
  { company: 'Zomato', jobCount: 310, avgSalary: 1500000, industry: 'Food Tech', growthRate: 14.8, rating: 3.8 },
];

// ---- Skill Growth Over Time (for trend charts) ----
export const skillGrowthData = [
  { month: 'Jan', Python: 7800, SQL: 7200, React: 5100, ML: 4200, GenAI: 800, AWS: 2900 },
  { month: 'Feb', Python: 7950, SQL: 7300, React: 5200, ML: 4350, GenAI: 950, AWS: 3000 },
  { month: 'Mar', Python: 8100, SQL: 7400, React: 5300, ML: 4500, GenAI: 1100, AWS: 3050 },
  { month: 'Apr', Python: 8200, SQL: 7500, React: 5350, ML: 4600, GenAI: 1300, AWS: 3100 },
  { month: 'May', Python: 8350, SQL: 7600, React: 5450, ML: 4700, GenAI: 1550, AWS: 3150 },
  { month: 'Jun', Python: 8400, SQL: 7650, React: 5500, ML: 4750, GenAI: 1700, AWS: 3200 },
  { month: 'Jul', Python: 8450, SQL: 7700, React: 5550, ML: 4800, GenAI: 1850, AWS: 3230 },
  { month: 'Aug', Python: 8500, SQL: 7750, React: 5580, ML: 4850, GenAI: 1980, AWS: 3280 },
  { month: 'Sep', Python: 8540, SQL: 7820, React: 5640, ML: 4890, GenAI: 1980, AWS: 3280 },
];

// ---- Industry Distribution ----
export const industryData = [
  { name: 'IT Services', value: 8200, color: '#6366f1' },
  { name: 'Technology', value: 4800, color: '#06b6d4' },
  { name: 'E-Commerce', value: 2850, color: '#8b5cf6' },
  { name: 'Fintech', value: 2200, color: '#10b981' },
  { name: 'Consulting', value: 1950, color: '#f59e0b' },
  { name: 'Healthcare', value: 1450, color: '#ef4444' },
  { name: 'EdTech', value: 1200, color: '#ec4899' },
  { name: 'Others', value: 2200, color: '#64748b' },
];

// ---- Job Types Distribution ----
export const jobTypeData = [
  { name: 'Full-Time', value: 18500, color: '#6366f1' },
  { name: 'Internship', value: 3620, color: '#8b5cf6' },
  { name: 'Contract', value: 1580, color: '#06b6d4' },
  { name: 'Part-Time', value: 850, color: '#f59e0b' },
  { name: 'Freelance', value: 300, color: '#10b981' },
];

// ---- Experience Distribution ----
export const experienceDistData = [
  { name: 'Fresher', value: 4520, color: '#6366f1' },
  { name: '1-3 yrs', value: 6180, color: '#06b6d4' },
  { name: '3-5 yrs', value: 5430, color: '#8b5cf6' },
  { name: '5-8 yrs', value: 4280, color: '#10b981' },
  { name: '8-12 yrs', value: 2650, color: '#f59e0b' },
  { name: '12+ yrs', value: 1790, color: '#ef4444' },
];

// ---- Remote vs On-site ----
export const remoteData = [
  { name: 'On-site', value: 14200, color: '#6366f1' },
  { name: 'Hybrid', value: 6800, color: '#8b5cf6' },
  { name: 'Remote', value: 3850, color: '#06b6d4' },
];

// ---- Internship Monthly Trend ----
export const internshipTrendData = [
  { month: 'Jul 2025', total: 2800, remote: 1120, onsite: 1680, avgStipend: 18000 },
  { month: 'Aug 2025', total: 2650, remote: 1100, onsite: 1550, avgStipend: 18500 },
  { month: 'Sep 2025', total: 2900, remote: 1200, onsite: 1700, avgStipend: 19000 },
  { month: 'Oct 2025', total: 3100, remote: 1350, onsite: 1750, avgStipend: 19500 },
  { month: 'Nov 2025', total: 2950, remote: 1250, onsite: 1700, avgStipend: 20000 },
  { month: 'Dec 2025', total: 2700, remote: 1150, onsite: 1550, avgStipend: 20500 },
  { month: 'Jan 2026', total: 3200, remote: 1400, onsite: 1800, avgStipend: 21000 },
  { month: 'Feb 2026', total: 3350, remote: 1500, onsite: 1850, avgStipend: 21500 },
  { month: 'Mar 2026', total: 3500, remote: 1600, onsite: 1900, avgStipend: 22000 },
  { month: 'Apr 2026', total: 3450, remote: 1550, onsite: 1900, avgStipend: 22500 },
  { month: 'May 2026', total: 3550, remote: 1620, onsite: 1930, avgStipend: 23000 },
  { month: 'Jun 2026', total: 3620, remote: 1650, onsite: 1970, avgStipend: 23500 },
];

// ---- Available Roles for Skill Gap ----
export const availableRoles = [
  'Data Analyst',
  'Business Analyst',
  'Data Scientist',
  'ML Engineer',
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Cloud Architect',
  'Product Manager',
  'UI/UX Designer',
];

// ---- Available Skills for Selection ----
export const availableSkills = [
  'Python', 'SQL', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js',
  'Java', 'C++', 'Go', 'Rust', 'R', 'Scala',
  'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'GenAI / LLMs',
  'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy',
  'Power BI', 'Tableau', 'Excel', 'Google Analytics',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
  'Git', 'CI/CD', 'Agile', 'Scrum',
  'Data Analytics', 'Data Science', 'Data Engineering',
  'Flutter', 'React Native', 'Swift', 'Kotlin',
  'HTML', 'CSS', 'Tailwind CSS', 'Figma',
  'Communication', 'Problem Solving', 'Leadership',
];
