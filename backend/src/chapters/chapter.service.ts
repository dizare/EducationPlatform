import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from './chapter.entity';
import { ChapterDTO } from './chapter.dto';
import { Course } from 'src/courses/course.entity';

@Injectable()
export class ChapterService {
  courseService: any;
  constructor(
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(chapterDto: ChapterDTO, courseId: number): Promise<Chapter> {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    const chapter = new Chapter(chapterDto.name, chapterDto.description);
    chapter.course = course;
    return await this.chapterRepository.save(chapter);
}



  async findAll(): Promise<Chapter[]> {
    return await this.chapterRepository.find();
  }

  async findAllByCourse(courseId: number): Promise<Chapter[]> {
    return await this.chapterRepository.find({ where: { course: { id: courseId } } });
  }

  async findOne(id: number): Promise<Chapter> {
    return await this.chapterRepository.findOneBy({id});
  }

  async update(id: number, chapterDto: ChapterDTO): Promise<Chapter> {
    const chapter = await this.chapterRepository.findOneBy({id});
    if (!chapter) {
      throw new Error('Chapter not found');
    }
    Object.assign(chapter, chapterDto);
    return await this.chapterRepository.save(chapter);
  }

  async remove(id: number): Promise<void> {
    await this.chapterRepository.delete(id);
  }
}
