import { Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(taskDto: TaskDto) {
    const newTask = { id: Date.now().toString(), ...taskDto };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, taskDto: TaskDto) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...taskDto };
      return this.tasks[index];
    }
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return { message: 'Task deleted successfully' };
  }
}
