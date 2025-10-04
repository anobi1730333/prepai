import { pgTable, text, timestamp, integer, boolean, jsonb, decimal, varchar, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified'),
  image: text('image'),
  password: text('password'),
  role: text('role').default('student'), // student, admin
  subscriptionStatus: text('subscription_status').default('free'), // free, premium
  subscriptionId: text('subscription_id'),
  stripeCustomerId: text('stripe_customer_id'),
  dailyQuestionsUsed: integer('daily_questions_used').default(0),
  weeklyMockTestsUsed: integer('weekly_mock_tests_used').default(0),
  lastResetDate: timestamp('last_reset_date').defaultNow(),
  examType: text('exam_type'), // IELTS, SAT, GMAT, GRE, ACT
  targetScore: text('target_score'),
  examDate: timestamp('exam_date'),
  studyHoursPerDay: integer('study_hours_per_day'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Sessions table for NextAuth
export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionToken: text('session_token').notNull().unique(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
});

// Accounts table for OAuth
export const accounts = pgTable('accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
});

// AI Questions History
export const questionHistory = pgTable('question_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  category: text('category'), // Math, Reading, Writing, Speaking
  examType: text('exam_type'), // IELTS, SAT, etc.
  createdAt: timestamp('created_at').defaultNow(),
});

// Practice Questions
export const practiceQuestions = pgTable('practice_questions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  question: text('question').notNull(),
  options: jsonb('options').notNull(), // Array of 4 options
  correctAnswer: integer('correct_answer').notNull(), // Index 0-3
  explanation: text('explanation').notNull(),
  category: text('category').notNull(),
  difficulty: text('difficulty').notNull(), // Easy, Medium, Hard
  examType: text('exam_type').notNull(),
  userAnswer: integer('user_answer'),
  isCorrect: boolean('is_correct'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Mock Exams
export const mockExams = pgTable('mock_exams', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  examType: text('exam_type').notNull(), // SAT Math, SAT Reading, IELTS Speaking
  duration: integer('duration').notNull(), // in minutes
  questions: jsonb('questions').notNull(), // Array of question objects
  userAnswers: jsonb('user_answers'),
  score: decimal('score', { precision: 5, scale: 2 }),
  totalQuestions: integer('total_questions').notNull(),
  correctAnswers: integer('correct_answers'),
  status: text('status').default('in_progress'), // in_progress, completed
  startedAt: timestamp('started_at').defaultNow(),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Speaking Evaluations
export const speakingEvaluations = pgTable('speaking_evaluations', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  prompt: text('prompt').notNull(),
  audioUrl: text('audio_url'),
  transcription: text('transcription'),
  pronunciation: decimal('pronunciation', { precision: 3, scale: 1 }), // 1-9 scale
  grammar: decimal('grammar', { precision: 3, scale: 1 }),
  fluency: decimal('fluency', { precision: 3, scale: 1 }),
  vocabulary: decimal('vocabulary', { precision: 3, scale: 1 }),
  coherence: decimal('coherence', { precision: 3, scale: 1 }),
  overallBand: decimal('overall_band', { precision: 3, scale: 1 }),
  feedback: text('feedback'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Homework Submissions
export const homeworkSubmissions = pgTable('homework_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  type: text('type').notNull(), // essay, dissertation, problem_set, research_paper, etc.
  description: text('description'),
  originalContent: text('original_content'), // Student's draft or problem description
  fileUrl: text('file_url'), // If they upload a document
  assistanceType: text('assistance_type').notNull(), // full_completion, guidance, review_feedback
  aiResponse: text('ai_response'),
  status: text('status').default('pending'), // pending, processing, completed
  wordCount: integer('word_count'),
  creditsUsed: integer('credits_used').default(1),
  createdAt: timestamp('created_at').defaultNow(),
  completedAt: timestamp('completed_at'),
});

// Study Plans
export const studyPlans = pgTable('study_plans', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  examType: text('exam_type').notNull(),
  targetScore: text('target_score'),
  examDate: timestamp('exam_date'),
  studyHoursPerDay: integer('study_hours_per_day'),
  schedule: jsonb('schedule').notNull(), // Weekly schedule with topics
  currentWeek: integer('current_week').default(1),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Progress Tracking
export const progressTracking = pgTable('progress_tracking', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: timestamp('date').defaultNow(),
  category: text('category').notNull(), // Math, Reading, Writing, Speaking
  score: decimal('score', { precision: 5, scale: 2 }),
  questionsAttempted: integer('questions_attempted').default(0),
  questionsCorrect: integer('questions_correct').default(0),
  timeSpent: integer('time_spent').default(0), // in minutes
  examType: text('exam_type'),
});

// Subscription Credits (for homework help)
export const subscriptionCredits = pgTable('subscription_credits', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  creditsRemaining: integer('credits_remaining').default(0),
  creditsTotal: integer('credits_total').default(0),
  resetDate: timestamp('reset_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  questionHistory: many(questionHistory),
  practiceQuestions: many(practiceQuestions),
  mockExams: many(mockExams),
  speakingEvaluations: many(speakingEvaluations),
  homeworkSubmissions: many(homeworkSubmissions),
  studyPlans: many(studyPlans),
  progressTracking: many(progressTracking),
  subscriptionCredits: many(subscriptionCredits),
}));
