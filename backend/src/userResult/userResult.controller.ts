import { Controller, Get, Param } from '@nestjs/common';
import { UserResultService } from './userResult.service';
import { UserResult } from './userResult.entity';
import { Public } from 'src/app.noguard.decorator';
@Controller('user-result')
export class UserResultController {
  constructor(private readonly userResultService: UserResultService) {}

  @Get()
  async findAll(): Promise<UserResult[]> {
    return this.userResultService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserResult | null> {
    return this.userResultService.findOneById(id);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<UserResult[]> {
    return this.userResultService.findByUserId(userId);
  }

  @Get('task/:taskId')
  async findByTaskId(@Param('taskId') taskId: number): Promise<UserResult[]> {
    return this.userResultService.findByTaskId(taskId);
  }
}
