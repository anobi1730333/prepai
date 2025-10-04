'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  FileText, 
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardStats {
  totalUsers: number;
  premiumUsers: number;
  freeUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalHomework: number;
  pendingPayments: number;
  completedPayments: number;
}

interface User {
  id: string;
  email: string;
  name: string | null;
  isPremium: boolean;
  premiumUntil: Date | null;
  createdAt: Date;
}

interface Payment {
  id: string;
  userId: string;
  amount: number;
  cryptocurrency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    premiumUsers: 0,
    freeUsers: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalHomework: 0,
    pendingPayments: 0,
    completedPayments: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // Check if user is admin (you can add admin field to user schema)
    // For now, we'll use email check
    const adminEmails = ['samuelmarks222@gmail.com', 'admin@prepai.com'];
    if (!adminEmails.includes(session.user?.email || '')) {
      router.push('/dashboard');
      return;
    }

    fetchDashboardData();
  }, [session, status, router]);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const statsResponse = await fetch('/api/admin/stats');
      const statsData = await statsResponse.json();
      setStats(statsData);

      // Fetch recent users
      const usersResponse = await fetch('/api/admin/users');
      const usersData = await usersResponse.json();
      setUsers(usersData);

      // Fetch recent payments
      const paymentsResponse = await fetch('/api/admin/payments');
      const paymentsData = await paymentsResponse.json();
      setPayments(paymentsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Manage your PrepAI platform</p>
          </div>
          <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-lg">
            <Shield className="h-5 w-5 text-purple-600" />
            <span className="font-semibold text-purple-600">Admin Access</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats.premiumUsers} premium • {stats.freeUsers} free
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 border-2 border-green-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-600">${stats.totalRevenue}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    ${stats.monthlyRevenue} this month
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Homework Generated</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.totalHomework}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    All time completions
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 border-2 border-orange-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Payments</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pendingPayments}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats.completedPayments} completed
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recent Users & Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Recent Users
            </h2>
            <div className="space-y-3">
              {users.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium">{user.email}</p>
                    <p className="text-xs text-gray-500">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    {user.isPremium ? (
                      <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-semibold">
                        Premium
                      </span>
                    ) : (
                      <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                        Free
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Payments */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Recent Payments
            </h2>
            <div className="space-y-3">
              {payments.slice(0, 5).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium">${payment.amount}</p>
                    <p className="text-xs text-gray-500">
                      {payment.cryptocurrency} • {new Date(payment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    {payment.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : payment.status === 'pending' ? (
                      <Clock className="h-5 w-5 text-orange-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <DollarSign className="h-4 w-4 mr-2" />
              View All Payments
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
