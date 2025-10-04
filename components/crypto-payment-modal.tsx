'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Check, Bitcoin, Wallet } from 'lucide-react';
import Image from 'next/image';

interface CryptoPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  plan: 'monthly' | 'yearly';
}

export function CryptoPaymentModal({ isOpen, onClose, userId, plan }: CryptoPaymentModalProps) {
  const [cryptocurrency, setCryptocurrency] = useState<string>('USDT');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const cryptoOptions = [
    { value: 'BTC', label: 'Bitcoin (BTC)', icon: '₿' },
    { value: 'ETH', label: 'Ethereum (ETH)', icon: 'Ξ' },
    { value: 'BNB', label: 'BNB (BNB)', icon: '🔶' },
    { value: 'USDT', label: 'Tether (USDT)', icon: '₮' },
    { value: 'USDC', label: 'USD Coin (USDC)', icon: '$' },
  ];

  const handleGeneratePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/crypto-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          plan,
          cryptocurrency,
          amount: plan === 'monthly' ? 29.99 : 299.99,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setPaymentDetails(data);
      }
    } catch (error) {
      console.error('Payment generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Wallet className="h-6 w-6 text-purple-600" />
            Pay with Cryptocurrency
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!paymentDetails ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Cryptocurrency
                </label>
                <Select value={cryptocurrency} onValueChange={setCryptocurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptoOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{option.icon}</span>
                          {option.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Plan Details</h3>
                <div className="space-y-1 text-sm">
                  <p>Plan: <span className="font-medium">{plan === 'monthly' ? 'Monthly Premium' : 'Yearly Premium'}</span></p>
                  <p>Price: <span className="font-medium">${plan === 'monthly' ? '29.99' : '299.99'} USD</span></p>
                  <p className="text-xs text-gray-600 mt-2">
                    ✓ Unlimited homework completions<br/>
                    ✓ Advanced AI humanization<br/>
                    ✓ All citation styles<br/>
                    ✓ Priority support
                  </p>
                </div>
              </div>

              <Button
                onClick={handleGeneratePayment}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {loading ? 'Generating Payment...' : 'Generate Payment Address'}
              </Button>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg border-2 border-purple-200 inline-block">
                  <Image
                    src={paymentDetails.payment.qrCode}
                    alt="Payment QR Code"
                    width={250}
                    height={250}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Send Amount
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <code className="flex-1 text-lg font-mono font-bold text-purple-600">
                      {paymentDetails.payment.amount} {cryptocurrency}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(paymentDetails.payment.amount.toString())}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Payment Address
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <code className="flex-1 text-sm font-mono break-all">
                      {paymentDetails.payment.address}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(paymentDetails.payment.address)}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Network: {paymentDetails.payment.network}
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Instructions</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {paymentDetails.instructions.map((instruction: string, index: number) => (
                      <li key={index}>• {instruction}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-center text-sm text-gray-600">
                  <p>Payment expires in 30 minutes</p>
                  <p className="mt-2">After sending, your account will be upgraded automatically within 10-30 minutes.</p>
                </div>
              </div>

              <Button
                onClick={onClose}
                variant="outline"
                className="w-full"
              >
                I've Sent the Payment
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
