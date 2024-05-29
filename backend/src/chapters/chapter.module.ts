import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from './chapter.entity';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { CourseModule } from 'src/courses/course.module';
import { Course } from 'src/courses/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter, Course])], // Добавляем Course в imports
  providers: [ChapterService],
  controllers: [ChapterController],
})
export class ChapterModule {}