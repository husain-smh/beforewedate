import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load env vars
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('knowthatperson');
    
    // Read scenarios from JSON file
    const scenariosPath = join(process.cwd(), 'data', 'scenarios.json');
    const scenariosData = JSON.parse(readFileSync(scenariosPath, 'utf-8'));
    
    const scenarios = scenariosData.map((s: any) => ({
      title: s.title,
      category: s.category,
      story: s.fullText || s.story,
      tags: s.tags || [],
      shareCount: 0,
      createdAt: new Date(),
    }));
    
    const result = await db.collection('scenarios').insertMany(scenarios);
    console.log(`✅ Inserted ${result.insertedCount} scenarios`);
  } catch (error) {
    console.error('❌ Error seeding:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();

