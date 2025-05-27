import { Controller, Get, Query } from '@nestjs/common';
import { AnnouncmentService } from './announcment.service';

@Controller('announcments')
export class AnnouncmentController {
  constructor(private readonly annoucmentService: AnnouncmentService) {}

   @Get()
  async getAnnouncments() {
    return this.annoucmentService.getAnnouncments();
  }
}
