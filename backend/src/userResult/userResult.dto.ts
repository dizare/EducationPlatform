import { IsNotEmpty, IsOptional, isNotEmpty } from 'class-validator';

export class UserResultDTO {
    constructor(userId: number, taskId: number, resultId: number) {
        this.userId = userId;
        this.taskId = taskId;
        this.resultId = resultId;
      }

    @IsNotEmpty({message: "User ID is required"})
    userId: number;

    @IsNotEmpty({message: "Task ID is required"})
    taskId: number;

    @IsNotEmpty({message: "REsult ID is required"})
    resultId: number;

}
