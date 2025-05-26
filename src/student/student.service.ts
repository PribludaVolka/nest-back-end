import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentService {
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

    const [students, count] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        where,
        include: {
          class: true,
          attendances: true,
          results: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.student.count({ where }),
    ]);

    return { students, count };
  }

  async getAll() {
    const [students] = await this.prisma.$transaction([
      this.prisma.student.findMany(),
    ]);

    return students;
  }
}
