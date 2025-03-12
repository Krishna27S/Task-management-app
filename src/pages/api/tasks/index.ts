import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db('taskDB');
    const collection = db.collection('tasks');

    switch (req.method) {
      case 'GET':
        const tasks = await collection
          .find({})
          .sort({ createdAt: -1 })
          .toArray();
        
        console.log('Retrieved tasks:', tasks.length);
        res.status(200).json(tasks);
        break;

      case 'POST':
        const task = {
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await collection.insertOne(task);
        const insertedTask = await collection.findOne({ _id: result.insertedId });
        
        console.log('Created task:', insertedTask);
        res.status(201).json(insertedTask);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Error processing request' });
  }
}