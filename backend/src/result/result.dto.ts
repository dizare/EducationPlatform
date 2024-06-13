import { IsNotEmpty, IsOptional } from 'class-validator';

export class ResultDTO{
    constructor(code: string, isSuccess: boolean, cpuTimeSpent: string, memorySpent: string) {
        this.code = code;
        this.isSuccess = isSuccess;
        this.cpuTimeSpent = cpuTimeSpent;
        this.memorySpent = memorySpent;
      }
    
    @IsNotEmpty({message: "Код не может быть пустым"})
    code: string;

    @IsNotEmpty({message: "isSucces не может быть пустым"})
    isSuccess: boolean;

    @IsOptional()
    cpuTimeSpent: string;

    @IsOptional()
    memorySpent: string;

}