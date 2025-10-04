import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { question, examType, category } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // Use Lindy AI instead of OpenAI
    const prompt = `You are an expert tutor helping students prepare for ${examType || 'standardized exams'}.
  
Question: ${question}
Category: ${category || 'General'}

Provide a detailed, step-by-step explanation that helps the student understand the concept thoroughly.`;

    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/lindy-ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, type: 'tutor' }),
    });

    const data = await response.json();

    return NextResponse.json({
      answer: data.answer,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Question API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    );
  }
}
