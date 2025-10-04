import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Read file content
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // For text files, extract content
    let content = '';
    const fileType = file.type;
    
    if (fileType.includes('text') || fileType.includes('pdf') || fileType.includes('document')) {
      content = buffer.toString('utf-8');
    }

    // Save file temporarily
    const filename = `${Date.now()}-${file.name}`;
    const filepath = join('/tmp', filename);
    await writeFile(filepath, buffer);

    return NextResponse.json({
      success: true,
      filename: file.name,
      filepath,
      content: content.substring(0, 10000), // First 10k chars
      size: file.size,
      type: file.type
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
