import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db('taskDB');
    const collection = db.collection('tasks');

    switch (req.method) {
      case 'GET':
        const task = await collection.findOne({ 
          _id: new ObjectId(id as string) 
        });
        
        if (task) {
          console.log('Retrieved task:', task);
          res.status(200).json(task);
        } else {
          res.status(404).json({ message: 'Task not found' });
        }
        break;

      case 'PUT':
        const updateData = {
          ...req.body,
          updatedAt: new Date()
        };

        const updatedTask = await collection.findOneAndUpdate(
          { _id: new ObjectId(id as string) },
          { $set: updateData },
          { returnDocument: 'after' }
        );

        if (updatedTask.value) {
          console.log('Updated task:', updatedTask.value);
          res.status(200).json(updatedTask.value);
        } else {
          res.status(404).json({ message: 'Task not found' });
        }
        break;

      case 'DELETE':
        const deleteResult = await collection.deleteOne({
          _id: new ObjectId(id as string)
        });

        if (deleteResult.deletedCount > 0) {
          console.log('Deleted task:', id);
          res.status(200).json({ message: 'Task deleted successfully' });
        } else {
          res.status(404).json({ message: 'Task not found' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Error processing request' });
  }
}