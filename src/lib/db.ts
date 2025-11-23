import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  const db = client.db('knowthatperson');
  
  // Ensure collections exist (MongoDB creates them automatically on first write, but this ensures they're ready)
  await ensureCollections(db);
  
  return db;
}

async function ensureCollections(db: Db) {
  // List existing collections
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map(c => c.name);
  
  // Collections we need
  const requiredCollections = ['scenarios', 'shares', 'answers'];
  
  // MongoDB creates collections automatically on first write, so we just verify they exist
  // This function ensures the database is initialized
  for (const collName of requiredCollections) {
    if (!collectionNames.includes(collName)) {
      // Create collection explicitly (optional - MongoDB would create it anyway)
      await db.createCollection(collName);
    }
  }
}

