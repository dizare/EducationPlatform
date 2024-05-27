import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Chapter } from '../chapters/chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Chapter])],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}