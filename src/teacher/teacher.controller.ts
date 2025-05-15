import { Controller, Get, Query } from '@nestjs/common';
import { TeacherService } from './teacher.service';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async getAllTeachers(
    @Query('page') page = '1',
    @Query('limit') limit = '5',
    @Query() query: Record<string, string>,
  ) {
    return this.teacherService.findAll(+page, +limit, query);
  }
}
