import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterDTO } from './chapter.dto';
import { Chapter } from './chapter.entity';

@Controller('chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  async create(@Body() chapterDto: ChapterDTO): Promise<Chapter> {
    return await this.chapterService.create(chapterDto);
  }

  @Get()
  async findAll(): Promise<Chapter[]> {
    return await this.chapterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Chapter> {
    return await this.chapterService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() chapterDto: ChapterDTO): Promise<Chapter> {
    return await this.chapterService.update(Number(id), chapterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.chapterService.remove(Number(id));
  }
}
