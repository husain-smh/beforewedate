import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load env vars
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

const client = new MongoClient(uri);

async function createIndexes() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('knowthatperson');
    
    // Shares indexes
    await db.collection('shares').createIndex({ token: 1 }, { unique: true });
    await db.collection('shares').createIndex({ scenarioId: 1 });
    await db.collection('shares').createIndex({ deletedAt: 1 });
    
    // Answers indexes
    await db.collection('answers').createIndex({ shareId: 1 });
    await db.collection('answers').createIndex({ createdAt: -1 });
    await db.collection('answers').createIndex({ deletedAt: 1 });
    await db.collection('answers').createIndex({ public: 1 });
    
    // Scenarios indexes
    await db.collection('scenarios').createIndex({ category: 1 });
    await db.collection('scenarios').createIndex({ createdAt: -1 });
    await db.collection('scenarios').createIndex({ deletedAt: 1 });
    await db.collection('scenarios').createIndex({ tags: 1 });
    
    console.log('✅ Indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

createIndexes();

