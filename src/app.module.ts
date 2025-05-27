import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { TeacherModule } from './teacher/teacher.module';
import { ParentModule } from './parent/parent.module';
import { LessonModule } from './lesson/lesson.module';
import { GradeModule } from './grade/grade.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ClassModule } from './class/class.module';
import { SubjectModule } from './subject/subject.module';
import { ResultModule } from './result/result.module';
import { EventModule } from './event/event.module';
import { AnnounmentModule } from './announcments/announcment.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule, 
    StudentModule, 
    UserModule, 
    TeacherModule, 
    ParentModule, 
    LessonModule, 
    GradeModule, 
    ScheduleModule, 
    ClassModule, 
    SubjectModule, 
    ResultModule,
    EventModule,
    AnnounmentModule
  ],
})
export class AppModule {}
