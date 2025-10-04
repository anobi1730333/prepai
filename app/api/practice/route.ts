import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { users, practiceQuestions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { generatePracticeQuestion } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { category, difficulty, examType, userAnswer } = await req.json();

    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate practice question
    const questionData = await generatePracticeQuestion(category, difficulty, examType);

    // Save to database
    const [savedQuestion] = await db.insert(practiceQuestions).values({
      userId: user.id,
      question: questionData.question,
      options: questionData.options,
      correctAnswer: questionData.correctAnswer,
      explanation: questionData.explanation,
      category,
      difficulty,
      examType,
      userAnswer: userAnswer !== undefined ? userAnswer : null,
      isCorrect: userAnswer !== undefined ? userAnswer === questionData.correctAnswer : null,
    }).returning();

    return NextResponse.json({ question: savedQuestion });
  } catch (error) {
    console.error('Error generating practice question:', error);
    return NextResponse.json({ error: 'Failed to generate question' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const questions = await db.query.practiceQuestions.findMany({
      where: eq(practiceQuestions.userId, user.id),
      orderBy: (practiceQuestions, { desc }) => [desc(practiceQuestions.createdAt)],
      limit: 50,
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error fetching practice questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
