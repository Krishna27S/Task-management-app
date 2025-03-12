import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll() {
    console.log('GET /tasks - Fetching all tasks');
    return this.tasksService.findAll();
  }

  @Post()
  async create(@Body() createTaskDto: any) {
    console.log('POST /tasks - Creating task:', createTaskDto);
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: any) {
    console.log(`PUT /tasks/${id} - Updating task:`, updateTaskDto);
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log(`DELETE /tasks/${id} - Deleting task`);
    return this.tasksService.remove(id);
  }
}