import { IsNotEmpty, IsOptional } from 'class-validator';

export class TaskDTO {
    constructor(name: string, description: string, input: string, output: string, chapterId: number) {
        this.name = name;
        this.description = description;
        this.input = input;
        this.output = output;
        this.chapterId = chapterId;
    }

    @IsNotEmpty({message: "Название не может быть пустым"})
    name: string;

    @IsNotEmpty({message: "Описание не может быть пустым"})
    description: string;

    @IsOptional()
    input?: string;

    @IsOptional()
    output?: string;

    @IsNotEmpty({message: 'Chapter ID is Required'})
    chapterId: number;
}
