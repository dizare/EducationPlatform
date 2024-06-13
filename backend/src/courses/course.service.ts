import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CourseDTO } from './course.dto';
import { Chapter } from 'src/chapters/chapter.entity';
import { Task } from 'src/tasks/task.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    // @InjectRepository(Chapter)
    // private chapterRepository: Repository<Chapter>,
    // @InjectRepository(Task)
    // private taskRepository: Repository<Task>,
  ) {}

  async create(courseDto: CourseDTO): Promise<Course> {
    const course = new Course(
      courseDto.name,
      courseDto.theme,
      courseDto.description,
      courseDto.num_of_task,
      courseDto.author,
    );
    return this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find({ relations: ['chapters'] });
  }

  async findOneById(id: number): Promise<Course> {
    return this.courseRepository.findOne({ where: { id }, relations: ['chapters'] });
  }

  async findByAuthor(author: string): Promise<Course[]> {
    return this.courseRepository.find({ where: { author }, relations: ['chapters'] });
  }

  async findOneWithDetails(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['chapters', 'chapters.tasks'],
    });
    return course;
  }

  async update(id: number, courseDto: CourseDTO): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id }, relations: ['chapters'] });
    if (!course) {
      throw new Error('Course not found');
    }
    Object.assign(course, courseDto);
    return await this.courseRepository.save(course);
  }

  async updateTotalTasks(courseId: number, increment: number) {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (course) {
      course.totalTasks += increment;
      await this.courseRepository.save(course);
      return course;
    }
    throw new Error('Course not found');
  }

  async remove(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
