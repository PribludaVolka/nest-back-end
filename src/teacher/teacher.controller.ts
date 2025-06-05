import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateTeacherDto } from './dto/teacher-create.dto';
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

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.teacherService.getOne(id);
  }

  @Get('/select')
  async getSelectTeacher() {
    return this.teacherService.getSelectTeacher();
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'img', maxCount: 1 },
  ]))
  public async create(
    @UploadedFiles() files: { img?: Express.Multer.File[] },
    @Body() dto: CreateTeacherDto
  ) {
      const image = files.img?.[0];
      return this.teacherService.create(dto, image);
  }

  @Delete()
  async delete(@Body('id') id: string) {
    return this.teacherService.delete(id);
  }
}
