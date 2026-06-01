import { NextRequest, NextResponse } from 'next/server';
import { getCareerRecommendations } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { skills, interests, experienceLevel } = await request.json();

    if (!skills?.length || !interests?.length || !experienceLevel) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resultJson = await getCareerRecommendations(skills, interests, experienceLevel);
    const result = JSON.parse(resultJson);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Career recommendation error:', error);

    // Fallback mock data
    return NextResponse.json({
      recommendedPaths: [
        {
          title: "Data Scientist",
          description: "Perfect blend of your analytical and ML skills. High demand and excellent growth prospects in India.",
          matchScore: 92,
          salaryRange: "₹8-30 LPA",
          growthOutlook: "Excellent — 35% YoY growth in India",
          keySkills: ["Python", "Machine Learning", "Statistics", "SQL", "Deep Learning"],
          topCompanies: ["Google", "Amazon", "Flipkart", "Microsoft"],
        },
        {
          title: "ML Engineer",
          description: "Focus on building and deploying ML models at scale. Strong engineering component.",
          matchScore: 85,
          salaryRange: "₹10-35 LPA",
          growthOutlook: "Excellent — fastest growing tech role",
          keySkills: ["Python", "TensorFlow", "MLOps", "Docker", "AWS"],
          topCompanies: ["Google", "Microsoft", "Amazon", "Razorpay"],
        },
        {
          title: "Data Analyst",
          description: "Strong match for your SQL and analytics skills. Great entry point into data careers.",
          matchScore: 78,
          salaryRange: "₹5-15 LPA",
          growthOutlook: "Good — steady 20% growth",
          keySkills: ["SQL", "Python", "Tableau", "Excel", "Statistics"],
          topCompanies: ["Deloitte", "Accenture", "TCS", "Flipkart"],
        },
      ],
      certifications: [
        { name: "Google Data Analytics Certificate", provider: "Google / Coursera", relevance: "Industry-recognized foundation", cost: "Free - ₹3,000/month" },
        { name: "AWS ML Specialty", provider: "Amazon", relevance: "Cloud ML deployment", cost: "~₹25,000" },
        { name: "TensorFlow Developer Certificate", provider: "Google", relevance: "Deep learning proficiency", cost: "~₹8,000" },
      ],
      learningRoadmap: [
        { phase: 1, title: "Strengthen Foundations", duration: "2-4 weeks", skills: ["Advanced Python", "Statistics"], description: "Solidify your core programming and stats skills" },
        { phase: 2, title: "Build Portfolio", duration: "4-6 weeks", skills: ["Kaggle Projects", "GitHub"], description: "Create 3-5 impressive projects showcasing your skills" },
        { phase: 3, title: "Specialize", duration: "4-8 weeks", skills: ["Deep Learning", "NLP or CV"], description: "Pick a specialization and go deep" },
      ],
      industryInsights: "The Indian data science market is projected to grow at 27% CAGR through 2027. GenAI adoption is creating new roles like 'AI Engineer' and 'Prompt Engineer'. Companies like Google, Microsoft, and major Indian startups (Razorpay, Zerodha, CRED) are aggressively hiring ML talent. Remote work is increasingly accepted, with 40% of data roles offering hybrid/remote options.",
      immediateActions: [
        "Update your LinkedIn profile with relevant skills and certifications",
        "Start a Kaggle competition to build practical experience",
        "Build 2-3 end-to-end ML projects for your portfolio",
        "Join data science communities (Analytics Vidhya, Kaggle forums)",
        "Apply for internships at target companies to gain industry experience",
      ],
    });
  }
}
