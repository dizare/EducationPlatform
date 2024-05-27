import { IsNotEmpty } from 'class-validator';

export class TaskDTO {
    constructor(name: string, description: string, input: string, output: string) {
        this.name = name;
        this.description = description;
        this.output = output;
    }

    @IsNotEmpty({message: "Название не может быть пустым"})
    name: string;

    @IsNotEmpty({message: "Описание не может быть пустым"})
    description: string;

    @IsNotEmpty({message: "Вывод не может быть пустым"})
    output: string;
  
}
