import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskDTO } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findOneById(id: number): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id });
  }

  async create(taskDto: TaskDTO, chapterId: number): Promise<Task> {
    const task = this.taskRepository.create({ ...taskDto, chapter: { id: chapterId } });
    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async update(id: number, taskDto: TaskDTO): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new Error('Task not found');
    }
    Object.assign(task, taskDto);
    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
