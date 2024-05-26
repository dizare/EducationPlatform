import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CourseDTO{
    constructor(name: string, theme: string, num_of_task: number, author: string){
        this.name = name;
        this.theme = theme;
        this.num_of_task = num_of_task;
        this.author = author;
    }

    @IsNotEmpty({message: ""})
    name: string;

    @IsNotEmpty({message: ""})
    theme: string;

    @IsNotEmpty({message: ""})
    num_of_task: number;

    @IsNotEmpty({message: ""})
    author: string;
}