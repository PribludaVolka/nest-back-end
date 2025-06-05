import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/subject-create.dto';
import { UpdateSubjectDto } from './dto/subject-update.dto';


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

  @Post()
  async create(
    @Body() dto: CreateSubjectDto
  ) {
    return this.subjectService.create(dto);
  }

  @Put()
  async update(@Body() dto: UpdateSubjectDto) {
    return this.subjectService.update(dto);
  }

  @Delete()
  async delete(@Body('id') id: number) {
    return this.subjectService.delete(id);
  }

  @Get('/select')
  async getSelectSubject() {
    return this.subjectService.getSelectSubject();
  }
}
