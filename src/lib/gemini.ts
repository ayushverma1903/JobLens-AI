import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('GEMINI_API_KEY is not set. AI features will be disabled.');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function analyzeResume(resumeTextOrBase64: string, mimeType?: string): Promise<string> {
  if (!genAI) throw new Error('Gemini API not configured');
  
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  const prompt = `You are an expert ATS (Applicant Tracking System) resume analyzer and career counselor. Analyze the provided resume and provide a detailed JSON response.
  
Respond with ONLY valid JSON in this exact format:
{
  "atsScore": <number 0-100>,
  "qualityScore": <number 0-100>,
  "summary": "<2-3 sentence professional summary>",
  "extractedSkills": ["skill1", "skill2", ...],
  "missingKeywords": ["keyword1", "keyword2", ...],
  "improvements": [
    {
      "category": "<Format|Content|Skills|Experience|Education>",
      "suggestion": "<specific actionable suggestion>",
      "priority": "<high|medium|low>",
      "impact": "<brief impact description>"
    }
  ],
  "strengths": ["strength1", "strength2", ...],
  "weaknesses": ["weakness1", "weakness2", ...],
  "experienceLevel": "<fresher|junior|mid|senior|lead>",
  "matchingIndustries": ["industry1", "industry2", ...]
}`;

  let content: any[] = [];
  if (mimeType && mimeType !== 'text/plain') {
    content = [
      prompt,
      {
        inlineData: {
          data: resumeTextOrBase64,
          mimeType: mimeType
        }
      }
    ];
  } else {
    content = [
      `${prompt}\n\nResume Text:\n${resumeTextOrBase64}`
    ];
  }

  const result = await model.generateContent(content);
  const text = result.response.text();
  // Extract JSON from possible markdown code fences
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, text];
  return jsonMatch[1]?.trim() || text;
}

export async function analyzeSkillGap(
  currentSkills: string[],
  desiredRole: string
): Promise<string> {
  if (!genAI) throw new Error('Gemini API not configured');
  
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  const prompt = `You are an expert career counselor specializing in tech careers in India. A job seeker wants to transition to the role of "${desiredRole}".

Their current skills are: ${currentSkills.join(', ')}

Analyze the skill gap and provide a detailed JSON response:
{
  "overallReadiness": <number 0-100>,
  "matchingSkills": ["skill1", "skill2"],
  "missingSkills": [
    {
      "name": "<skill name>",
      "priority": "<critical|important|nice-to-have>",
      "estimatedTime": "<e.g., 2-3 weeks>",
      "resources": ["resource1", "resource2"],
      "reason": "<why this skill matters for the role>"
    }
  ],
  "learningRoadmap": [
    {
      "phase": 1,
      "title": "<phase title>",
      "duration": "<e.g., 4-6 weeks>",
      "skills": ["skill1", "skill2"],
      "description": "<what to focus on>"
    }
  ],
  "recommendedCertifications": ["cert1", "cert2"],
  "salaryExpectation": "<salary range in LPA for this role in India>"
}

Respond with ONLY valid JSON.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, text];
  return jsonMatch[1]?.trim() || text;
}

export async function getCareerRecommendations(
  skills: string[],
  interests: string[],
  experienceLevel: string
): Promise<string> {
  if (!genAI) throw new Error('Gemini API not configured');
  
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  const prompt = `You are an expert AI career counselor for the Indian tech job market. Based on the following profile, provide personalized career recommendations.

Skills: ${skills.join(', ')}
Interests: ${interests.join(', ')}
Experience Level: ${experienceLevel}

Respond with ONLY valid JSON:
{
  "recommendedPaths": [
    {
      "title": "<role title>",
      "description": "<why this is a good fit>",
      "matchScore": <0-100>,
      "salaryRange": "<salary range in LPA>",
      "growthOutlook": "<description of growth prospects>",
      "keySkills": ["skill1", "skill2"],
      "topCompanies": ["company1", "company2"]
    }
  ],
  "certifications": [
    {
      "name": "<certification name>",
      "provider": "<provider>",
      "relevance": "<why it matters>",
      "cost": "<approximate cost>"
    }
  ],
  "learningRoadmap": [
    {
      "phase": 1,
      "title": "<phase title>",
      "duration": "<timeframe>",
      "skills": ["skill1"],
      "description": "<what to learn>"
    }
  ],
  "industryInsights": "<paragraph about relevant industry trends>",
  "immediateActions": ["action1", "action2", "action3"]
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, text];
  return jsonMatch[1]?.trim() || text;
}

export async function getMarketInsight(topic: string, context: string): Promise<string> {
  if (!genAI) throw new Error('Gemini API not configured');
  
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  const prompt = `You are an expert job market analyst for the Indian tech industry. Provide a concise, insightful analysis about the following topic.

Topic: ${topic}
Context: ${context}

Provide a clear, well-structured response in 3-4 paragraphs covering:
1. Current state and trends
2. Why this matters for job seekers
3. Future outlook and predictions
4. Actionable advice

Keep the tone professional but accessible. Include specific data points and examples where possible.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
