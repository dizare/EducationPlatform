import { IsNotEmpty } from 'class-validator';

export class ChapterDTO {
    constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
}
  @IsNotEmpty({message: "Название не может быть пустым"})
  name: string;

  @IsNotEmpty({message: "Описание не может быть пустым"})
  description: string;
}
