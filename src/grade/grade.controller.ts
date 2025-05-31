import { Controller, Get } from '@nestjs/common';
import { GradeService } from './grade.service';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Get('/select')
  async getSelectGrade() {
    return this.gradeService.getSelectGrades();
  }
}
