import { Controller, Get, Query } from '@nestjs/common';
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
}
