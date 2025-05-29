import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/class-create.dto';
import { UpdateClassDto } from './dto/class-update.dto';

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

  @Post()
    async create(
      @Body() dto: CreateClassDto
    ) {
      return this.classService.create(dto);
    }
  
    @Put()
    async update(@Body() dto: UpdateClassDto) {
      return this.classService.update(dto);
    }
  
    @Delete()
    async delete(@Body('id') id: number) {
      return this.classService.delete(id);
    }
}


