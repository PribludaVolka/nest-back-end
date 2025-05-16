import { Controller, Get, Query } from '@nestjs/common';
import { ParentService } from './parent.service';

@Controller('parents')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Get()
  async getAllParents(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search: string,
  ) {
    return this.parentService.findAll(+page, +limit, search);
  }
}
