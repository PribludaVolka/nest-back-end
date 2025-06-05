import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService, PrismaService, FileService],
})
export class TeacherModule {}
