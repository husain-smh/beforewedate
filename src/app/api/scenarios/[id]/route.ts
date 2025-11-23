import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const scenario = await db.collection('scenarios').findOne({
      _id: new ObjectId(params.id),
      deletedAt: { $exists: false }
    });
    
    if (!scenario) {
      return NextResponse.json(
        { error: 'Scenario not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      id: scenario._id.toString(),
      title: scenario.title,
      category: scenario.category,
      fullText: scenario.story,
      tags: scenario.tags || [],
      shareCount: scenario.shareCount || 0,
    });
  } catch (error) {
    console.error('Error fetching scenario:', error);
    return NextResponse.json(
      { error: 'Invalid scenario ID' },
      { status: 400 }
    );
  }
}

