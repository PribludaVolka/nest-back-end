import { Controller, Get, Query } from '@nestjs/common';
import { SubjectService } from './subject.service';


@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async getAllSubjects(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search: string,
  ) {
    return this.subjectService.findAll(+page, +limit, search);
  }

  @Get('/all')
  async getAll() {
    return this.subjectService.getAll();
  }
}
