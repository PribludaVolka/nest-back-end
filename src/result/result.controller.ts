import { Controller, Get, Query } from '@nestjs/common';
import { ResultService } from './result.service';


@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get()
  async getAllResults(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search: string,
  ) {
    return this.resultService.findAll(+page, +limit, search);
  }
}
