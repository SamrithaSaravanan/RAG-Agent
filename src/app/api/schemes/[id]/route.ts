import { NextRequest, NextResponse } from 'next/server';
import { SCHEMES } from '@/lib/schemes-data';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const scheme = SCHEMES.find(s => s.id === id || s.slug === id);

    if (!scheme) {
      return NextResponse.json(
        { error: 'Government scheme not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ scheme });
  } catch (error: any) {
    console.error('Scheme Detail API Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve scheme details.' },
      { status: 500 }
    );
  }
}
