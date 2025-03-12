import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], required: true },
});
