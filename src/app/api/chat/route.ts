import { NextRequest, NextResponse } from 'next/server';
import { searchSimilarChunks } from '@/lib/vector-store';
import { generateRAGAnswer, detectLanguage } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, language } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message content is required.' },
        { status: 400 }
      );
    }

    const trimmedQuery = message.trim();
    const detectedLang = language || detectLanguage(trimmedQuery);

    // 1. Vector similarity search for relevant document chunks
    const retrievedChunks = await searchSimilarChunks(trimmedQuery, 5);

    // 2. Generate answer grounded strictly on retrieved official documents
    const { answer, citations, grounded } = await generateRAGAnswer({
      question: trimmedQuery,
      chunks: retrievedChunks,
      language: detectedLang,
    });

    return NextResponse.json({
      answer,
      citations,
      grounded,
      language: detectedLang,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process chat query.',
        details: error?.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
