'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Sparkles, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeworkUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [humanizedResult, setHumanizedResult] = useState('');
  const [formData, setFormData] = useState({
    assignmentType: 'essay',
    topic: '',
    instructions: '',
    citationStyle: 'APA',
    wordCount: 1000,
    serviceType: 'complete'
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult('');
    setHumanizedResult('');

    try {
      let fileContent = '';
      
      // Upload file if provided
      if (file) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });
        
        const uploadData = await uploadRes.json();
        fileContent = uploadData.content || '';
      }

      // Generate homework response
      const prompt = `You are an expert academic writer. Complete this assignment with 100% accuracy.

Assignment Type: ${formData.assignmentType}
Topic: ${formData.topic}
Instructions: ${formData.instructions}
Citation Style: ${formData.citationStyle}
Word Count: ${formData.wordCount} words
${fileContent ? `\n\nUploaded Content:\n${fileContent}` : ''}

Requirements:
1. Write a complete, well-structured ${formData.assignmentType}
2. Use proper ${formData.citationStyle} citation format
3. Include in-text citations and references
4. Meet the ${formData.wordCount} word count requirement
5. Use academic language and proper formatting
6. Ensure 100% accuracy and originality

Write the complete assignment now:`;

      const response = await fetch('/api/lindy-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type: 'homework' }),
      });

      const data = await response.json();
      setResult(data.answer);

      // Humanize the text
      const humanizePrompt = `Humanize the following AI-generated text to make it sound natural and undetectable by AI detectors.

Make it:
- More conversational and natural
- Include slight imperfections (like humans write)
- Vary sentence structure and length
- Add personal touches and natural transitions
- Remove robotic patterns

Text to humanize:
${data.answer}

Humanized version:`;

      const humanizeRes = await fetch('/api/lindy-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: humanizePrompt, type: 'humanize' }),
      });

      const humanizeData = await humanizeRes.json();
      setHumanizedResult(humanizeData.answer);

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process homework. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadResult = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            AI Homework Assistant
          </CardTitle>
          <CardDescription>
            Upload your assignment or describe it, and our AI will complete it with 100% accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Assignment Type</Label>
              <Select
                value={formData.assignmentType}
                onValueChange={(value) => setFormData({ ...formData, assignmentType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="essay">Essay</SelectItem>
                  <SelectItem value="research-paper">Research Paper</SelectItem>
                  <SelectItem value="dissertation">Dissertation</SelectItem>
                  <SelectItem value="thesis">Thesis</SelectItem>
                  <SelectItem value="case-study">Case Study</SelectItem>
                  <SelectItem value="lab-report">Lab Report</SelectItem>
                  <SelectItem value="book-review">Book Review</SelectItem>
                  <SelectItem value="article-review">Article Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Citation Style</Label>
              <Select
                value={formData.citationStyle}
                onValueChange={(value) => setFormData({ ...formData, citationStyle: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="APA">APA (7th Edition)</SelectItem>
                  <SelectItem value="MLA">MLA (9th Edition)</SelectItem>
                  <SelectItem value="Chicago">Chicago (17th Edition)</SelectItem>
                  <SelectItem value="Harvard">Harvard</SelectItem>
                  <SelectItem value="IEEE">IEEE</SelectItem>
                  <SelectItem value="Vancouver">Vancouver</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Topic</Label>
            <Input
              placeholder="Enter your assignment topic"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Instructions</Label>
            <Textarea
              placeholder="Provide detailed instructions for your assignment..."
              rows={4}
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Word Count</Label>
            <Input
              type="number"
              placeholder="1000"
              value={formData.wordCount}
              onChange={(e) => setFormData({ ...formData, wordCount: parseInt(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Assignment File (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept=".txt,.doc,.docx,.pdf"
                onChange={handleFileChange}
                className="flex-1"
              />
              {file && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {file.name}
                </span>
              )}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading || !formData.topic}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="mr-2"
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
                Generating Your Assignment...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Complete My Homework
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="border-2 border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Original Version
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadResult(result, 'assignment-original.txt')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                {result}
              </div>
            </CardContent>
          </Card>

          {humanizedResult && (
            <Card className="border-2 border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    Humanized Version (Undetectable)
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadResult(humanizedResult, 'assignment-humanized.txt')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardTitle>
                <CardDescription>
                  This version is optimized to pass AI detection tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none whitespace-pre-wrap bg-purple-50 p-4 rounded-lg">
                  {humanizedResult}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  );
}
