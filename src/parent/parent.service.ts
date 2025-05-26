import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ParentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [parents, count] = await this.prisma.$transaction([
      this.prisma.parent.findMany({
        where,
        include: {
          students: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.parent.count({ where }),
    ]);

    return { parents, count };
  }

  async getAll() {
    const [parents] = await this.prisma.$transaction([
      this.prisma.parent.findMany(),
    ]);

    return parents;
  }
}
