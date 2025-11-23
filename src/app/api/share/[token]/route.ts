import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const db = await getDb();
    
    const share = await db.collection('shares').findOne({
      token: params.token,
      deletedAt: { $exists: false }
    });
    
    if (!share) {
      return NextResponse.json(
        { error: 'Share not found' },
        { status: 404 }
      );
    }
    
    const [scenario, answers] = await Promise.all([
      db.collection('scenarios').findOne({
        _id: share.scenarioId,
        deletedAt: { $exists: false }
      }),
      db.collection('answers')
        .find({
          shareId: share._id,
          deletedAt: { $exists: false },
          public: true
        })
        .sort({ createdAt: 1 })
        .toArray()
    ]);
    
    if (!scenario) {
      return NextResponse.json(
        { error: 'Scenario not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      scenario: {
        id: scenario._id.toString(),
        title: scenario.title,
        category: scenario.category,
        fullText: scenario.story,
        tags: scenario.tags || [],
      },
      answers: answers.map(a => ({
        id: a._id.toString(),
        name: a.name,
        perspective: a.perspective,
        createdAt: a.createdAt,
      }))
    });
  } catch (error) {
    console.error('Error fetching share:', error);
    return NextResponse.json(
      { error: 'Failed to fetch share' },
      { status: 500 }
    );
  }
}

