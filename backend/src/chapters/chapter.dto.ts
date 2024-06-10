import { IsNotEmpty } from 'class-validator';

export class ChapterDTO {
    constructor(name: string, description: string, courseId: number) {
    this.name = name;
    this.description = description;
    this.courseId = courseId;
}
  @IsNotEmpty({message: "Название не может быть пустым"})
  name: string;

  @IsNotEmpty({message: "Описание не может быть пустым"})
  description: string;

  @IsNotEmpty({ message: 'Course ID is required' })
  courseId: number;
}
