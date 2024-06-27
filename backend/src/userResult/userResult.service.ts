import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResult } from './userResult.entity';

@Injectable()
export class UserResultService {
  constructor(
    @InjectRepository(UserResult)
    private userResultRepository: Repository<UserResult>,
  ) {}

  async findAll(): Promise<UserResult[]> {
    return this.userResultRepository.find({ relations: ['user', 'task', 'result'] });
  }

  async findOneById(id: number): Promise<UserResult | null> {
    return this.userResultRepository.findOne({ where: { userResultId: id }, relations: ['user', 'task', 'result'] });
  }

  async findByUserId(userId: number): Promise<UserResult[]> {
    return this.userResultRepository.find({ where: { user: { id: userId } }, relations: ['user', 'task', 'result'] });
  }

  async findByTaskId(taskId: number): Promise<UserResult[]> {
    return this.userResultRepository.find({ where: { task: { id: taskId } }, relations: ['user', 'task', 'result'] });
  }

  async findByUserIdAndTaskId(userId: number, taskId: number): Promise<UserResult | null> {
    return this.userResultRepository.findOne({
      where: { user: { id: userId }, task: { id: taskId } },
      relations: ['user', 'task', 'result'],
    });
  }
}
