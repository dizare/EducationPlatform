import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDTO } from './task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() taskDto: TaskDTO, @Body('chapterId') chapterId: number): Promise<Task> {
    return await this.taskService.create(taskDto, chapterId);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return await this.taskService.findOneById(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() taskDto: TaskDTO): Promise<Task> {
    return await this.taskService.update(Number(id), taskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.taskService.remove(Number(id));
  }
}
