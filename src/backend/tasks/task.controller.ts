import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() taskDto: TaskDto) {
    return this.taskService.createTask(taskDto);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() taskDto: TaskDto) {
    return this.taskService.updateTask(id, taskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
