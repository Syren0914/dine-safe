// /pages/api/inspections.ts (Next.js API route)
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('inspectionsDB');

  const inspections = await db.collection('inspections').find().toArray();
  res.status(200).json(inspections);
}
