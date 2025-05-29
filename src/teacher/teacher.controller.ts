import { Controller, Get, Query } from '@nestjs/common';
import { TeacherService } from './teacher.service';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async getAllTeachers(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search: string,
  ) {
    return this.teacherService.findAll(+page, +limit, search);
  }

  @Get('/all')
  async getAll() {
    return this.teacherService.getAll();
  }

  @Get('/select')
  async getSelectTeacher() {
    return this.teacherService.getSelectTeacher();
  }
}
