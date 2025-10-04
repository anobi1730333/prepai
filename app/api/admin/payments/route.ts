import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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

    // Mock payment data (replace with actual payment table queries when implemented)
    const mockPayments = [
      {
        id: '1',
        userId: 'user1',
        amount: 29.99,
        cryptocurrency: 'USDT-TRC20',
        status: 'completed',
        createdAt: new Date(),
      },
      {
        id: '2',
        userId: 'user2',
        amount: 299.99,
        cryptocurrency: 'BTC',
        status: 'pending',
        createdAt: new Date(),
      },
    ];

    return NextResponse.json(mockPayments);
  } catch (error) {
    console.error('Admin payments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}
