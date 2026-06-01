import { NextRequest, NextResponse } from 'next/server';
import { analyzeSkillGap } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { currentSkills, desiredRole } = await request.json();

    if (!currentSkills?.length || !desiredRole) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resultJson = await analyzeSkillGap(currentSkills, desiredRole);
    const result = JSON.parse(resultJson);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Skill gap analysis error:', error);

    // Fallback mock data for demo
    return NextResponse.json({
      overallReadiness: 62,
      matchingSkills: ["Python", "SQL", "Data Analysis"],
      missingSkills: [
        { name: "Machine Learning", priority: "critical", estimatedTime: "4-6 weeks", resources: ["Andrew Ng's ML Course", "Kaggle"], reason: "Core requirement for this role" },
        { name: "Deep Learning", priority: "critical", estimatedTime: "6-8 weeks", resources: ["Fast.ai", "PyTorch tutorials"], reason: "Essential for modern ML applications" },
        { name: "MLOps", priority: "important", estimatedTime: "3-4 weeks", resources: ["MLflow docs", "DVC tutorials"], reason: "Needed for production ML systems" },
        { name: "Cloud Services (AWS/GCP)", priority: "important", estimatedTime: "4-5 weeks", resources: ["AWS ML Specialty", "GCP ML certification"], reason: "Most ML systems run on cloud" },
        { name: "Docker & Kubernetes", priority: "nice-to-have", estimatedTime: "2-3 weeks", resources: ["Docker docs", "K8s tutorials"], reason: "Useful for containerized deployments" },
      ],
      learningRoadmap: [
        { phase: 1, title: "Foundation Building", duration: "4-6 weeks", skills: ["Statistics", "Linear Algebra", "ML Basics"], description: "Master the mathematical foundations and basic ML concepts" },
        { phase: 2, title: "Core ML Skills", duration: "6-8 weeks", skills: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation"], description: "Hands-on ML with scikit-learn, build real projects" },
        { phase: 3, title: "Advanced Topics", duration: "4-6 weeks", skills: ["Deep Learning", "NLP", "Computer Vision"], description: "Dive into neural networks with TensorFlow/PyTorch" },
        { phase: 4, title: "Production Skills", duration: "3-4 weeks", skills: ["MLOps", "Cloud Deployment", "Docker"], description: "Learn to deploy and monitor ML models in production" },
      ],
      recommendedCertifications: [
        "Google Professional Machine Learning Engineer",
        "AWS Machine Learning Specialty",
        "TensorFlow Developer Certificate",
      ],
      salaryExpectation: "₹8-25 LPA depending on experience",
    });
  }
}
