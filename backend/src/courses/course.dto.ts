import { IsNotEmpty } from "class-validator";

export class CourseDTO {
  constructor(name: string, theme: string, num_of_task: number, author: string) {
    this.name = name;
    this.theme = theme;
    this.num_of_task = num_of_task;
    this.author = author;
  }

  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @IsNotEmpty({ message: "Theme is required" })
  theme: string;

  @IsNotEmpty()
  num_of_task: number;

  @IsNotEmpty({ message: "Author is required" })
  author: string;
}
