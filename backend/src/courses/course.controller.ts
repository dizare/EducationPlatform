import { Controller, Get, Post, Body, Param, Put, Delete, Request } from '@nestjs/common';
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

  @Public()
  @Get('allCourses')
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get('userCourses')
  async findByAuthor(@Request() req): Promise<Course[]> {
    const author = req.user.id;  // Предполагается, что id пользователя хранится в req.user.id
    return this.courseService.findByAuthor(author);
  }
  
  @Public()
  @Get('course/:id')  
  async editCourse(@Param('id') id: string): Promise<Course> {
    return this.courseService.findOneById(Number(id));
 }

  @Public()
  @Get('courseDetails/:id')
  async findOneWithDetails(@Param('id') id: string): Promise<Course> {
    return this.courseService.findOneWithDetails(Number(id));
  }

  @Public()
  @Put('updateTotalTasks/:id')
  async updateTotalTasks(@Param('id') courseId: number, @Body() body: { increment: number }) {
    return this.courseService.updateTotalTasks(courseId, body.increment);
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
