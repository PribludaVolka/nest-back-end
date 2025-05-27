import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnnouncmentService {
  constructor(private readonly prisma: PrismaService) {}

    async getAnnouncments() {
        return this.prisma.event.findMany({
            take: 3
        });
    }
}
