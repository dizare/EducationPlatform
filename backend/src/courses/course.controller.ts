import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDTO } from './course.dto';
import { Course } from './course.entity';
import { Public } from 'src/app.noguard.decorator';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Public()
  @Post('createCourse')
  async create(@Body() courseDto: CourseDTO): Promise<Course> {
    return this.courseService.create(courseDto);
  }

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }
  
  @Public()
  @Get('course/:id')
  async editCourse(@Param('id') id: string): Promise<Course> {
    return this.courseService.findOneById(Number(id));
}

  @Put(':id')
  async update(@Param('id') id: string, @Body() courseDto: CourseDTO): Promise<Course> {
    return this.courseService.update(Number(id), courseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.courseService.remove(Number(id));
  }
}
