import { IsNotEmpty, MaxLength } from "class-validator";

export class CourseDTO {
  constructor(name: string, theme: string, num_of_task: number, author: string, description: string, chapters: number[]) {
    this.name = name;
    this.theme = theme;
    this.num_of_task = num_of_task;
    this.author = author;
    this.description = description;
    this.chapters = chapters;
  }

  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @IsNotEmpty({ message: "Theme is required" })
  theme: string;

  @MaxLength(5000, {message: "Максимальная длина описания 5000 символов" })
  description: string;

  num_of_task: number;

  @IsNotEmpty({ message: "Author is required" })
  author: string;

  chapters: number[];
}
