import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ParentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number, queryParams?: Record<string, string>) {
    const skip = (page - 1) * limit;
    const query: Prisma.ParentWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case 'search':
              query.name = { contains: value, mode: 'insensitive' };
              break;
          }
        }
      }
    }

    const [parents, count] = await this.prisma.$transaction([
      this.prisma.parent.findMany({
        where: query,
        include: {
          students: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.parent.count({ where: query }),
    ]);

    return { parents, count };
  }
}
