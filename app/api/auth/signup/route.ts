import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, subscriptionCredits } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [newUser] = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      subscriptionStatus: 'free',
      dailyQuestionsUsed: 0,
      weeklyMockTestsUsed: 0,
      lastResetDate: new Date(),
    }).returning();

    // Initialize subscription credits (0 for free users)
    await db.insert(subscriptionCredits).values({
      userId: newUser.id,
      creditsRemaining: 0,
      creditsTotal: 0,
    });

    return NextResponse.json({ success: true, userId: newUser.id });
  } catch (error) {
    console.error('Sign up error:', error);
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}
