import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    
    const skip = (page - 1) * limit;
    
    const db = await getDb();
    const scenariosCollection = db.collection('scenarios');
    
    const query: any = { deletedAt: { $exists: false } };
    if (category) {
      // Handle comma-separated categories
      const categories = category.split(',').map(c => c.trim()).filter(Boolean);
      if (categories.length > 0) {
        query.category = { $in: categories };
      }
    }
    
    const [scenarios, total] = await Promise.all([
      scenariosCollection
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      scenariosCollection.countDocuments(query)
    ]);
    
    return NextResponse.json({
      scenarios: scenarios.map(s => ({
        id: s._id.toString(),
        title: s.title,
        category: s.category,
        preview: s.story.substring(0, 200) + (s.story.length > 200 ? '...' : ''),
        tags: s.tags || [],
        shareCount: s.shareCount || 0,
      })),
      pagination: {
        page,
        limit,
        total,
        hasMore: skip + scenarios.length < total,
      }
    });
  } catch (error) {
    console.error('Error fetching scenarios:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scenarios' },
      { status: 500 }
    );
  }
}

