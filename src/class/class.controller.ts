import { Controller, Get, Query } from '@nestjs/common';
import { ClassService } from './class.service';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  async getAllClasses(
    @Query('page') page = '1',
    @Query('limit') limit = '5',
    @Query('search') search: string,
  ) {
    return this.classService.findAll(+page, +limit, search);
  }

  @Get('/all')
  async getAll() {
    return this.classService.getAll();
  }
}
