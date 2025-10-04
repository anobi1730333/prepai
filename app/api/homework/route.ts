import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { users, homeworkSubmissions, subscriptionCredits } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { helpWithHomework } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, type, description, originalContent, assistanceType } = await req.json();

    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user has credits (for premium users)
    if (user.subscriptionStatus === 'premium') {
      const credits = await db.query.subscriptionCredits.findFirst({
        where: eq(subscriptionCredits.userId, user.id),
      });

      if (!credits || credits.creditsRemaining <= 0) {
        return NextResponse.json(
          { error: 'No credits remaining. Credits reset monthly.' },
          { status: 429 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Homework help is only available for premium users. Upgrade to access this feature.' },
        { status: 403 }
      );
    }

    // Create homework submission
    const [submission] = await db.insert(homeworkSubmissions).values({
      userId: user.id,
      title,
      type,
      description,
      originalContent,
      assistanceType,
      status: 'processing',
    }).returning();

    // Generate AI response
    const aiResponse = await helpWithHomework(type, description, originalContent, assistanceType);

    // Update submission with AI response
    const [updatedSubmission] = await db.update(homeworkSubmissions)
      .set({
        aiResponse,
        status: 'completed',
        completedAt: new Date(),
        wordCount: aiResponse.split(/\s+/).length,
      })
      .where(eq(homeworkSubmissions.id, submission.id))
      .returning();

    // Deduct credit
    await db.update(subscriptionCredits)
      .set({
        creditsRemaining: db.$count(subscriptionCredits.creditsRemaining) - 1,
      })
      .where(eq(subscriptionCredits.userId, user.id));

    return NextResponse.json({ submission: updatedSubmission });
  } catch (error) {
    console.error('Error processing homework:', error);
    return NextResponse.json({ error: 'Failed to process homework' }, { status: 500 });
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

    const submissions = await db.query.homeworkSubmissions.findMany({
      where: eq(homeworkSubmissions.userId, user.id),
      orderBy: (homeworkSubmissions, { desc }) => [desc(homeworkSubmissions.createdAt)],
    });

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Error fetching homework submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}
