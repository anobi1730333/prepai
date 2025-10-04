import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { users, homework } from '@/lib/db/schema';
import { sql, count, eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const adminEmails = ['samuelmarks222@gmail.com', 'admin@prepai.com'];
    if (!adminEmails.includes(session.user?.email || '')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get total users
    const totalUsersResult = await db.select({ count: count() }).from(users);
    const totalUsers = totalUsersResult[0]?.count || 0;

    // Get premium users
    const premiumUsersResult = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.isPremium, true));
    const premiumUsers = premiumUsersResult[0]?.count || 0;

    // Get free users
    const freeUsers = totalUsers - premiumUsers;

    // Get total homework generated
    const totalHomeworkResult = await db.select({ count: count() }).from(homework);
    const totalHomework = totalHomeworkResult[0]?.count || 0;

    // Calculate revenue (mock data - replace with actual payment data)
    const totalRevenue = premiumUsers * 29.99;
    const monthlyRevenue = premiumUsers * 29.99;

    // Mock payment stats (replace with actual payment table queries)
    const pendingPayments = 0;
    const completedPayments = premiumUsers;

    return NextResponse.json({
      totalUsers,
      premiumUsers,
      freeUsers,
      totalRevenue: totalRevenue.toFixed(2),
      monthlyRevenue: monthlyRevenue.toFixed(2),
      totalHomework,
      pendingPayments,
      completedPayments,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
