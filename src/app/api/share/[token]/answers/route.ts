import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { validateName, validatePerspective } from '@/lib/utils';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { name, perspective, public: isPublic = true } = await request.json();
    
    // Validate inputs
    const nameValidation = validateName(name);
    if (!nameValidation.valid) {
      return NextResponse.json(
        { error: nameValidation.error },
        { status: 400 }
      );
    }
    
    const perspectiveValidation = validatePerspective(perspective);
    if (!perspectiveValidation.valid) {
      return NextResponse.json(
        { error: perspectiveValidation.error },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    
    // Find share
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
    
    // Insert answer
    await db.collection('answers').insertOne({
      shareId: share._id,
      name: name.trim(),
      perspective: perspective.trim(),
      public: isPublic,
      createdAt: new Date(),
    });
    
    // Return updated answers
    const answers = await db.collection('answers')
      .find({
        shareId: share._id,
        deletedAt: { $exists: false },
        public: true
      })
      .sort({ createdAt: 1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      answers: answers.map(a => ({
        id: a._id.toString(),
        name: a.name,
        perspective: a.perspective,
        createdAt: a.createdAt,
      }))
    });
  } catch (error) {
    console.error('Error adding answer:', error);
    return NextResponse.json(
      { error: 'Failed to add answer' },
      { status: 500 }
    );
  }
}

