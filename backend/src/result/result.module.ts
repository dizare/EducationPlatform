import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResultService } from "./result.service";
import { ResultController } from "./result.controller";
import { Result } from "./result.entity";
import { Task } from "src/tasks/task.entity";
import { UserResult } from "src/userResult/userResult.entity";
import { User } from "src/users/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Result, UserResult, User, Task])],
  providers: [ResultService],
  controllers: [ResultController],
})
export class ResultModule {}
