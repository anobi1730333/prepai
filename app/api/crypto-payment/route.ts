import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Cryptocurrency Payment Integration (Binance Pay)
 * Supports: BTC, ETH, BNB, USDT (ERC20, TRC20), USDC
 */

interface CryptoPaymentRequest {
  userId: string;
  plan: 'monthly' | 'yearly';
  cryptocurrency: 'BTC' | 'ETH' | 'BNB' | 'USDT' | 'USDT-TRC20' | 'USDC';
  amount: number;
}

interface PaymentAddress {
  cryptocurrency: string;
  address: string;
  network: string;
  qrCode: string;
  amount: number;
  expiresAt: string;
}

// Crypto wallet addresses (replace with your actual addresses)
const CRYPTO_WALLETS = {
  BTC: {
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    network: 'Bitcoin (BTC)',
  },
  ETH: {
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    network: 'Ethereum (ERC20)',
  },
  BNB: {
    address: 'bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2',
    network: 'BNB Smart Chain (BEP20)',
  },
  USDT: {
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    network: 'Ethereum (ERC20) / BSC (BEP20)',
  },
  'USDT-TRC20': {
    address: 'TGe2KwSvygmxwh1z61GCuCRnNGebn3gk99',
    network: 'TRON (TRC20)',
  },
  USDC: {
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    network: 'Ethereum (ERC20)',
  },
};

// Pricing in USD
const PRICING = {
  monthly: 29.99,
  yearly: 299.99,
};

// Approximate crypto conversion rates (in production, fetch from API)
const CRYPTO_RATES = {
  BTC: 43000,
  ETH: 2300,
  BNB: 310,
  USDT: 1,
  'USDT-TRC20': 1,
  USDC: 1,
};

export async function POST(req: NextRequest) {
  try {
    const body: CryptoPaymentRequest = await req.json();
    const { userId, plan, cryptocurrency, amount } = body;

    // Validate request
    if (!userId || !plan || !cryptocurrency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate crypto amount
    const usdAmount = PRICING[plan];
    const cryptoAmount = usdAmount / CRYPTO_RATES[cryptocurrency];
    
    // Get wallet address
    const wallet = CRYPTO_WALLETS[cryptocurrency];
    
    // Generate payment details
    const paymentDetails: PaymentAddress = {
      cryptocurrency,
      address: wallet.address,
      network: wallet.network,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${wallet.address}`,
      amount: parseFloat(cryptoAmount.toFixed(8)),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
    };

    // Create pending payment record
    // In production, store this in database
    
    return NextResponse.json({
      success: true,
      payment: paymentDetails,
      instructions: [
        `Send exactly ${cryptoAmount.toFixed(8)} ${cryptocurrency} to the address below`,
        `Network: ${wallet.network}`,
        'Payment will be confirmed within 10-30 minutes',
        'Do not send from an exchange (use a personal wallet)',
        'Your account will be upgraded automatically after confirmation',
      ],
    });
  } catch (error) {
    console.error('Crypto payment error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment request' },
      { status: 500 }
    );
  }
}

// Verify payment endpoint
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const txHash = searchParams.get('txHash');
    const userId = searchParams.get('userId');

    if (!txHash || !userId) {
      return NextResponse.json(
        { error: 'Missing transaction hash or user ID' },
        { status: 400 }
      );
    }

    // In production, verify transaction on blockchain
    // For now, return mock verification
    
    // Update user to premium
    await db
      .update(users)
      .set({
        isPremium: true,
        premiumUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      })
      .where(eq(users.id, userId));

    return NextResponse.json({
      success: true,
      verified: true,
      message: 'Payment confirmed! Your account has been upgraded to Premium.',
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
