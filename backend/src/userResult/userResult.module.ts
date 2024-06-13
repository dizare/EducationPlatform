import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResult } from './userResult.entity';
import { User } from 'src/users/user.entity';
import { Task } from 'src/tasks/task.entity';
import { Result } from 'src/result/result.entity';
import { UserResultService } from './userResult.service';
import { UserResultController } from './userResult.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserResult, User, Task, Result])],
  providers: [UserResultService],
  controllers: [UserResultController],
})
export class UserResultModule {}
