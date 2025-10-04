/**
 * Lindy AI Integration
 * Using Lindy's AI instead of OpenAI for cost-free AI responses
 */

export async function generateAIAnswer(question: string, category?: string, examType?: string): Promise<string> {
  const prompt = `You are an expert tutor helping students prepare for ${examType || 'standardized exams'}.
  
Question: ${question}
Category: ${category || 'General'}

Provide a detailed, step-by-step explanation that helps the student understand the concept thoroughly.`;

  // Using Lindy AI - no API key needed!
  const response = await fetch('/api/lindy-ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, type: 'tutor' }),
  });

  const data = await response.json();
  return data.answer;
}

export async function generatePracticeQuestion(category: string, difficulty: string, examType: string) {
  const prompt = `Generate a ${difficulty} difficulty ${category} question for ${examType} exam.
  
Format as JSON:
{
  "question": "the question text",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": "A",
  "explanation": "detailed explanation"
}`;

  const response = await fetch('/api/lindy-ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, type: 'practice', format: 'json' }),
  });

  return response.json();
}

export async function completeHomework(
  assignmentType: string,
  topic: string,
  instructions: string,
  citationStyle: 'APA' | 'MLA' | 'Chicago',
  wordCount: number,
  fileContent?: string
) {
  const prompt = `You are an expert academic writer. Complete this assignment with 100% accuracy.

Assignment Type: ${assignmentType}
Topic: ${topic}
Instructions: ${instructions}
Citation Style: ${citationStyle}
Word Count: ${wordCount} words
${fileContent ? `\n\nUploaded Content:\n${fileContent}` : ''}

Requirements:
1. Write a complete, well-structured ${assignmentType}
2. Use proper ${citationStyle} citation format
3. Include in-text citations and references
4. Meet the ${wordCount} word count requirement
5. Use academic language and proper formatting
6. Ensure 100% accuracy and originality

Write the complete assignment now:`;

  const response = await fetch('/api/lindy-ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, type: 'homework' }),
  });

  const data = await response.json();
  return data.answer;
}

export async function humanizeText(text: string): Promise<string> {
  const prompt = `Humanize the following AI-generated text to make it sound natural and undetectable by AI detectors.

Make it:
- More conversational and natural
- Include slight imperfections (like humans write)
- Vary sentence structure and length
- Add personal touches and natural transitions
- Remove robotic patterns

Text to humanize:
${text}

Humanized version:`;

  const response = await fetch('/api/lindy-ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, type: 'humanize' }),
  });

  const data = await response.json();
  return data.answer;
}

export async function reviewHomework(fileContent: string, assignmentType: string): Promise<string> {
  const prompt = `You are an expert academic reviewer. Review this ${assignmentType} and provide detailed feedback.

Content:
${fileContent}

Provide:
1. Overall assessment (grade/score)
2. Strengths
3. Areas for improvement
4. Specific suggestions
5. Grammar and style feedback
6. Citation and formatting feedback

Detailed review:`;

  const response = await fetch('/api/lindy-ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, type: 'review' }),
  });

  const data = await response.json();
  return data.answer;
}

export async function generateEssayOutline(
  topic: string,
  essayType: string,
  citationStyle: string,
  wordCount: number
): Promise<string> {
  const prompt = `Create a detailed outline for a ${essayType} essay on: ${topic}

Requirements:
- Citation Style: ${citationStyle}
- Target Length: ${wordCount} words
- Include thesis statement
- Main points with sub-points
- Suggested sources
- Conclusion strategy

Detailed outline:`;

  const response = await fetch('/api/lindy-ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, type: 'outline' }),
  });

  const data = await response.json();
  return data.answer;
}
