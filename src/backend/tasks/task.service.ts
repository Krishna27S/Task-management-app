import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.taskModel.find().sort({ createdAt: -1 });
      console.log('Found tasks:', tasks.length);
      return tasks;
    } catch (error) {
      console.error('Error finding tasks:', error);
      throw error;
    }
  }

  async create(createTaskDto: any): Promise<Task> {
    try {
      const task = new this.taskModel(createTaskDto);
      const savedTask = await task.save();
      console.log('Created task:', savedTask);
      return savedTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async update(id: string, updateTaskDto: any): Promise<Task> {
    try {
      const task = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      console.log('Updated task:', task);
      return task;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.taskModel.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        throw new NotFoundException('Task not found');
      }
      console.log('Deleted task:', id);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}