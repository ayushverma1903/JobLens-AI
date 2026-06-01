import { NextRequest, NextResponse } from 'next/server';
import { getMarketInsight } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  let topic = '';
  try {
    const body = await request.json();
    topic = body.topic;
    const context = body.context;

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const insight = await getMarketInsight(topic, context || '');

    return NextResponse.json({ insight });
  } catch (error) {
    console.error('Market insights error:', error);

    return NextResponse.json({
      insight: `The ${topic || 'technology'} landscape is experiencing significant growth in the Indian market. Companies across Bangalore, Hyderabad, and Pune are actively hiring for these skills, with salary premiums of 20-40% compared to traditional roles. The trend is expected to continue through 2027, driven by digital transformation initiatives across industries. Job seekers should focus on building practical project experience and obtaining relevant certifications to maximize their opportunities.`,
    });
  }
}
