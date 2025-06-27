import { MongoClient, Db } from "mongodb";
import { any } from "zod";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("⚠️ MONGODB_URI not defined in environment variables");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectDB(): Promise<Db> {
  if (cachedDb && cachedClient) {
    return cachedDb;
  }

  const client = new MongoClient(uri as any);
  await client.connect();
  const db = client.db("inspectionsDB"); // change to match your DB name exactly

  cachedClient = client;
  cachedDb = db;

  return db;
}
