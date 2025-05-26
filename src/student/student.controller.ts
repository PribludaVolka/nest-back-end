import { Controller, Get, Query } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getAllStudents(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search: string,
  ) {
    return this.studentService.findAll(+page, +limit, search);
  }

  @Get('/all')
  async getAll() {
    return this.studentService.getAll();
  }
}
