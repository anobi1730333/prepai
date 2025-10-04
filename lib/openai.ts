import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAIAnswer(question: string, category: string, examType: string) {
  const prompt = `You are an expert tutor for ${examType} exam preparation. A student has asked the following ${category} question:

"${question}"

Provide a detailed, step-by-step explanation that helps the student understand the concept thoroughly. Use clear language and examples where appropriate.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content || '';
}

export async function generatePracticeQuestion(category: string, difficulty: string, examType: string) {
  const prompt = `Generate a ${difficulty} difficulty multiple-choice question for ${examType} ${category} practice.

Format your response as JSON with this structure:
{
  "question": "The question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Detailed explanation of why the answer is correct"
}

The correctAnswer should be the index (0-3) of the correct option.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
    response_format: { type: 'json_object' },
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
}

export async function generateMockExam(examType: string, questionCount: number) {
  const prompt = `Generate a mock ${examType} exam with ${questionCount} multiple-choice questions.

Format your response as JSON with this structure:
{
  "questions": [
    {
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Explanation",
      "category": "Math/Reading/Writing"
    }
  ]
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
    response_format: { type: 'json_object' },
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
}

export async function evaluateSpeaking(transcription: string, prompt: string) {
  const evaluationPrompt = `You are an IELTS speaking examiner. Evaluate the following response to the prompt:

Prompt: "${prompt}"

Student's Response: "${transcription}"

Provide a detailed evaluation with scores (1-9 scale) for:
- Pronunciation
- Grammar
- Fluency
- Vocabulary
- Coherence

Also provide an overall band score and specific feedback for improvement.

Format your response as JSON:
{
  "pronunciation": 7.5,
  "grammar": 7.0,
  "fluency": 8.0,
  "vocabulary": 7.5,
  "coherence": 7.5,
  "overallBand": 7.5,
  "feedback": "Detailed feedback here"
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: evaluationPrompt }],
    temperature: 0.5,
    response_format: { type: 'json_object' },
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
}

export async function transcribeAudio(audioBuffer: Buffer) {
  const file = new File([audioBuffer], 'audio.webm', { type: 'audio/webm' });
  
  const transcription = await openai.audio.transcriptions.create({
    file: file,
    model: 'whisper-1',
  });

  return transcription.text;
}

export async function generateStudyPlan(
  examType: string,
  targetScore: string,
  examDate: Date,
  studyHoursPerDay: number
) {
  const daysUntilExam = Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const weeksUntilExam = Math.ceil(daysUntilExam / 7);

  const prompt = `Create a personalized study plan for a student preparing for ${examType} with the following details:
- Target Score: ${targetScore}
- Days until exam: ${daysUntilExam}
- Study hours per day: ${studyHoursPerDay}

Generate a week-by-week study schedule with specific topics and activities for each day.

Format as JSON:
{
  "schedule": [
    {
      "week": 1,
      "focus": "Main focus area",
      "days": [
        {
          "day": "Monday",
          "topics": ["Topic 1", "Topic 2"],
          "activities": ["Activity 1", "Activity 2"],
          "duration": ${studyHoursPerDay}
        }
      ]
    }
  ],
  "totalWeeks": ${weeksUntilExam}
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    response_format: { type: 'json_object' },
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
}

export async function helpWithHomework(
  type: string,
  description: string,
  originalContent: string,
  assistanceType: 'full_completion' | 'guidance' | 'review_feedback'
) {
  let prompt = '';

  switch (assistanceType) {
    case 'full_completion':
      prompt = `You are an expert academic writer. Complete the following ${type}:

Title/Topic: ${description}

${originalContent ? `Student's notes/outline: ${originalContent}` : ''}

Provide a complete, well-structured ${type} that meets academic standards.`;
      break;

    case 'guidance':
      prompt = `You are an academic advisor. Help the student structure their ${type}:

Title/Topic: ${description}

${originalContent ? `Student's initial thoughts: ${originalContent}` : ''}

Provide:
1. A detailed outline
2. Key points to cover
3. Research suggestions
4. Writing tips specific to this type of assignment`;
      break;

    case 'review_feedback':
      prompt = `You are an academic editor. Review and provide feedback on this ${type}:

Title/Topic: ${description}

Student's Draft:
${originalContent}

Provide:
1. Overall assessment
2. Strengths
3. Areas for improvement
4. Specific suggestions for revision
5. Grammar and style corrections`;
      break;
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 4000,
  });

  return completion.choices[0].message.content || '';
}
