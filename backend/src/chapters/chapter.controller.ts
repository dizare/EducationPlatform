import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterDTO } from './chapter.dto';
import { Chapter } from './chapter.entity';
import { Public } from 'src/app.noguard.decorator';

@Controller('chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Public()
  @Post('createChapter/:courseId')
  async create(@Body() chapterDto: ChapterDTO, @Param('courseId') courseId: number): Promise<Chapter> {
    return await this.chapterService.create(chapterDto, courseId);
  }

  @Public()
  @Get()
  async findAll(): Promise<Chapter[]> {
    return await this.chapterService.findAll();
  }

  @Public()
  @Get('chapterByCourse/:id')
  async findAllByCourse(@Param('id') courseId: string): Promise<Chapter[]> {
  const courseIdNumber = parseInt(courseId, 10); // Преобразуем строку в число
  return await this.chapterService.findAllByCourse(courseIdNumber);
}


  @Public()
  @Get('chapter/:id')
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
