import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from './chapter.entity';
import { ChapterDTO } from './chapter.dto';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
  ) {}

  async create(chapterDto: ChapterDTO): Promise<Chapter> {
    const chapter = this.chapterRepository.create(chapterDto);
    return await this.chapterRepository.save(chapter);
  }

  async findAll(): Promise<Chapter[]> {
    return await this.chapterRepository.find();
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
