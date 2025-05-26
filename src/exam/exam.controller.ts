import { Controller, Get, Query } from '@nestjs/common';
import { ExamService } from './exam.service';


@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  async getAllExams(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search: string,
  ) {
    return this.examService.findAll(+page, +limit, search);
  }

  @Get('/all')
  async getAll() {
    return this.examService.getAll();
  }
}
