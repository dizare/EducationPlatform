import { Controller, Get, Param, Query } from "@nestjs/common";
import { CoursesService } from "./course.service";
import { Course } from "./course.entity";

@Controller('courses')
export class CourseController{
    constructor(private readonly courseService: CoursesService) {}

  @Get('getById/:id')
  getUserParam(@Param() params: any): Promise<Course> {
    return this.courseService.findOneById(params.id)
  }

  @Get('getById')
  getUserQuery(@Query('id') id: number) {
    return `String: ${id}`
  }
}