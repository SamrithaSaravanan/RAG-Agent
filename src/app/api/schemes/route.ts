import { NextRequest, NextResponse } from 'next/server';
import { SCHEMES } from '@/lib/schemes-data';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase() || '';

    let results = SCHEMES;

    if (category && category !== 'all') {
      results = results.filter(s => s.category === category);
    }

    if (search) {
      results = results.filter(s =>
        s.title_en.toLowerCase().includes(search) ||
        s.title_ta.toLowerCase().includes(search) ||
        s.short_description_en.toLowerCase().includes(search) ||
        s.short_description_ta.toLowerCase().includes(search) ||
        s.department_en.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({
      total: results.length,
      schemes: results,
    });
  } catch (error: any) {
    console.error('Schemes API Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve schemes.' },
      { status: 500 }
    );
  }
}
