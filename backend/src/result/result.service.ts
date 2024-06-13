import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/users/user.entity";
import { Task } from "src/tasks/task.entity";
import { Result } from "./result.entity";
import { UserResult } from "src/userResult/userResult.entity";
import { ResultDTO } from "./result.dto";
import { UserResultDTO } from "src/userResult/userResult.dto";

@Injectable()
export class ResultService {
    constructor(
        @InjectRepository(Result)
        private resultRepository: Repository<Result>,
        @InjectRepository(UserResult)
        private userResultRepository: Repository<UserResult>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async create(resultDto: ResultDTO, userId: number, taskId: number): Promise<Result> {
        const result = new Result(
            resultDto.code,
            resultDto.isSuccess,
            resultDto.cpuTimeSpent,
            resultDto.memorySpent
        );

        const savedResult = await this.resultRepository.save(result);

        const user = await this.userRepository.findOneBy({ id: userId });
        const task = await this.taskRepository.findOneBy({ id: taskId });

        if (!user || !task) {
            throw new Error('User or Task not found');
        }

        
        const userResultDto = new UserResultDTO(userId, taskId, savedResult.id);
        const userResult = this.userResultRepository.create({
            user: user,
            task: task,
            result: savedResult,
        });

        await this.userResultRepository.save(userResult);

        return savedResult;
    }

    async findOneById(id: number): Promise<Result> {
        return this.resultRepository.findOneBy({ id });
    }
}
