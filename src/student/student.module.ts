import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, FileService],
})
export class StudentModule {}
