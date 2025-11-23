import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { generateToken, getShareUrl } from '@/lib/utils';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const { scenarioId } = await request.json();
    
    if (!scenarioId) {
      return NextResponse.json(
        { error: 'scenarioId is required' },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    
    // Validate scenario exists
    const scenario = await db.collection('scenarios').findOne({
      _id: new ObjectId(scenarioId),
      deletedAt: { $exists: false }
    });
    
    if (!scenario) {
      return NextResponse.json(
        { error: 'Scenario not found' },
        { status: 404 }
      );
    }
    
    // Generate unique token
    let token = generateToken();
    let exists = await db.collection('shares').findOne({ 
      token,
      deletedAt: { $exists: false }
    });
    
    // Retry if collision (very rare)
    while (exists) {
      token = generateToken();
      exists = await db.collection('shares').findOne({ 
        token,
        deletedAt: { $exists: false }
      });
    }
    
    // Create share
    await db.collection('shares').insertOne({
      token,
      scenarioId: new ObjectId(scenarioId),
      createdAt: new Date(),
    });
    
    // Increment shareCount
    await db.collection('scenarios').updateOne(
      { _id: new ObjectId(scenarioId) },
      { $inc: { shareCount: 1 } }
    );
    
    const shareUrl = getShareUrl(token);
    
    return NextResponse.json({
      shareUrl,
      token,
    });
  } catch (error) {
    console.error('Error creating share:', error);
    return NextResponse.json(
      { error: 'Failed to create share' },
      { status: 500 }
    );
  }
}

