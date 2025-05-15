import { Controller, Get, Query } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getAllStudents(
    @Query('page') page = '1',
    @Query('limit') limit = '5',
    @Query() query: Record<string, string>,
  ) {
    return this.studentService.findAll(+page, +limit, query);
  }
}
