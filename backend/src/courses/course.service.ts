import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CoursesService{
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
    ) {}

    findOneById(id: number): Promise<Course | null> {
        return this.courseRepository.findOneBy({ id })
      }

      async remove(id: number): Promise<void> {
        await this.courseRepository.delete(id)
      }
}