import { Controller, Get, Query } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

   @Get()
  async getEvents(@Query('date') dateString: string) {
    const date = new Date(dateString);
    return this.eventService.getEventsByDate(date);
  }
}
