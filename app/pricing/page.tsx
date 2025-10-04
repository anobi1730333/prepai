'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Crown, Bitcoin, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CryptoPaymentModal } from '@/components/crypto-payment-modal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card'>('crypto');

  const handleUpgrade = (plan: 'monthly' | 'yearly', method: 'crypto' | 'card') => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setSelectedPlan(plan);
    setPaymentMethod(method);

    if (method === 'crypto') {
      setShowCryptoModal(true);
    } else {
      // Handle card payment (Stripe/PayPal)
      alert('Card payment coming soon!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock unlimited homework completions with advanced AI humanization that bypasses all detectors
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8 h-full border-2 hover:border-blue-300 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
                <h3 className="text-2xl font-bold">Free</h3>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>5 questions per day</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Basic AI tutor</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Practice questions</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <span className="text-xl">×</span>
                  <span>Homework completion</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <span className="text-xl">×</span>
                  <span>AI humanization</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            </Card>
          </motion.div>

          {/* Monthly Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 h-full border-2 border-purple-400 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-semibold">
                POPULAR
              </div>
              <div className="flex items-center gap-2 mb-4 mt-4">
                <Zap className="h-6 w-6 text-purple-600" />
                <h3 className="text-2xl font-bold">Monthly</h3>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29.99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="font-semibold">Unlimited questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="font-semibold">Unlimited homework completions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="font-semibold">Advanced AI humanization</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>All citation styles</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>File upload support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Priority support</span>
                </li>
              </ul>
              <div className="space-y-2">
                <Button
                  onClick={() => handleUpgrade('monthly', 'crypto')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Bitcoin className="h-4 w-4 mr-2" />
                  Pay with Crypto
                </Button>
                <Button
                  onClick={() => handleUpgrade('monthly', 'card')}
                  variant="outline"
                  className="w-full"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay with Card
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Yearly Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8 h-full border-2 border-yellow-400 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 text-sm font-semibold">
                SAVE 17%
              </div>
              <div className="flex items-center gap-2 mb-4 mt-4">
                <Crown className="h-6 w-6 text-yellow-600" />
                <h3 className="text-2xl font-bold">Yearly</h3>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$299.99</span>
                <span className="text-gray-600">/year</span>
                <div className="text-sm text-green-600 font-semibold mt-1">
                  Save $60 per year!
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="font-semibold">Everything in Monthly</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="font-semibold">17% discount</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="font-semibold">Priority feature access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Early access to new features</span>
                </li>
              </ul>
              <div className="space-y-2">
                <Button
                  onClick={() => handleUpgrade('yearly', 'crypto')}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  <Bitcoin className="h-4 w-4 mr-2" />
                  Pay with Crypto
                </Button>
                <Button
                  onClick={() => handleUpgrade('yearly', 'card')}
                  variant="outline"
                  className="w-full"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay with Card
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Why Choose Premium?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Advanced AI Humanization</h4>
                  <p className="text-sm text-gray-600">
                    Our enhanced humanizer bypasses all AI detectors with &lt;5% detection rate
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Complete Assignments</h4>
                  <p className="text-sm text-gray-600">
                    Get full essays, research papers, and more - not just guidelines
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Bitcoin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Crypto Payments</h4>
                  <p className="text-sm text-gray-600">
                    Pay securely with BTC, ETH, BNB, USDT, or USDC
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Crown className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Priority Support</h4>
                  <p className="text-sm text-gray-600">
                    Get help faster with dedicated premium support
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Crypto Payment Modal */}
      {session && (
        <CryptoPaymentModal
          isOpen={showCryptoModal}
          onClose={() => setShowCryptoModal(false)}
          userId={session.user.id}
          plan={selectedPlan}
        />
      )}
    </div>
  );
}
