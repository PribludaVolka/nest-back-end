import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { StudentService } from './student.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateStudentDto } from './dto/create-student.dto';

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

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.studentService.getOne(id);
  }
  
  
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'img', maxCount: 1 },
  ]))
  public async create(
    @UploadedFiles() files: { img?: Express.Multer.File[] },
    @Body() dto: CreateStudentDto
  ) {
      const image = files.img?.[0];
      return this.studentService.create(dto, image);
  }
  
  @Delete()
  async delete(@Body('id') id: string) {
    return this.studentService.delete(id);
  }
}
