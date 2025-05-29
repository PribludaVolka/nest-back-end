import {
  Controller,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get()
  async getAllLessons(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search: string,
  ) {
    return this.lessonService.findAll(+page, +limit, search);
  }

  @Get('/all')
  async getAll() {
    return this.lessonService.getAll();
  }

  // 🔥 Новый endpoint по типу и ID
  @Get('/by')
  async getByTypeAndId(
    @Query('type') type: 'teacherId' | 'classId',
    @Query('id') id: string,
  ) {
    if (type !== 'teacherId' && type !== 'classId') {
      throw new BadRequestException('Invalid type');
    }

    const where =
      type === 'teacherId'
        ? { teacherId: id }
        : { classId: Number(id) };

    const lessons = await this.lessonService.findMany({ where });

    return lessons.map((lesson) => ({
      title: lesson.name,
      start: lesson.startTime,
      end: lesson.endTime,
    }));
  }
}
