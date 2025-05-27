import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

    async getEventsByDate(date: Date) {
        const localDate = new Date(date);

        const startOfDay = new Date(
            localDate.getFullYear(),
            localDate.getMonth(),
            localDate.getDate(),
            0, 0, 0, 0
        );

        const endOfDay = new Date(
            localDate.getFullYear(),
            localDate.getMonth(),
            localDate.getDate(),
            23, 59, 59, 999
        );

        return this.prisma.event.findMany({
            where: {
            startTime: {
                gte: startOfDay,
                lte: endOfDay,
            },
            },
        });
    }
}
