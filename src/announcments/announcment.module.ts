import { Module } from '@nestjs/common';
import { AnnouncmentService } from './announcment.service';
import { AnnouncmentController } from './announcment.controller';

@Module({
  controllers: [AnnouncmentController],
  providers: [AnnouncmentService],
})
export class AnnounmentModule {}
