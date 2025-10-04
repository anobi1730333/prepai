'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, BookOpen, Brain, CheckCircle, LineChart, Mic, PenTool, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold">PrepAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-slate-600 hover:text-slate-900">Features</Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-900">Pricing</Link>
            <Link href="/auth/signin" className="text-slate-600 hover:text-slate-900">Sign In</Link>
            <Button asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">AI-Powered Exam Preparation</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            Master IELTS & SAT with<br />
            <span className="text-blue-600">AI-Powered Tutoring</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Get personalized study plans, instant homework help, and AI-powered practice tests. 
            Your 24/7 tutor for exam success.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild className="text-lg px-8">
              <Link href="/auth/signup">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
          <p className="text-sm text-slate-500 mt-4">5 free AI questions daily • No credit card required</p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-slate-600">Comprehensive AI-powered tools for exam preparation</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Q&A Tutor</h3>
            <p className="text-slate-600">
              Ask any question and get detailed, step-by-step explanations instantly. 
              Available 24/7 for Math, Reading, Writing, and Speaking.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Practice Questions</h3>
            <p className="text-slate-600">
              Generate unlimited multiple-choice questions with detailed explanations. 
              Choose difficulty levels and specific topics.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mock Exams</h3>
            <p className="text-slate-600">
              Take timed practice tests that simulate real exam conditions. 
              Get instant scoring and performance analysis.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Mic className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Speaking Evaluation</h3>
            <p className="text-slate-600">
              Practice IELTS speaking with AI evaluation. Get band scores and 
              detailed feedback on pronunciation, fluency, and grammar.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <PenTool className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Homework Help</h3>
            <p className="text-slate-600">
              Get AI assistance with essays, dissertations, and assignments. 
              Choose from full completion, guidance, or review feedback.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <LineChart className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-slate-600">
              Visualize your improvement with detailed analytics. 
              Identify weak areas and get personalized study recommendations.
            </p>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-slate-600">Start free, upgrade when you need more</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-8 border-2">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-slate-600">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span>5 AI questions per day</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span>1 mock test per week</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Basic progress tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Practice questions</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </Card>

          <Card className="p-8 border-2 border-blue-600 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$15</span>
              <span className="text-slate-600">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="font-medium">Unlimited AI questions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="font-medium">10 mock tests per month</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="font-medium">Speaking evaluation & feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="font-medium">Homework help (10 credits/month)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="font-medium">Advanced analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="font-medium">Personalized study plans</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="font-medium">Priority support</span>
              </li>
            </ul>
            <Button className="w-full" asChild>
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Ace Your Exam?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who are already improving their scores with PrepAI
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8">
            <Link href="/auth/signup">
              Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold">PrepAI</span>
            </div>
            <p className="text-slate-600 text-sm">
              © 2025 PrepAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
