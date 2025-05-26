import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExamService {
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

    const [exams, count] = await this.prisma.$transaction([
      this.prisma.exam.findMany({
        where,
        include: {
          results: true,
          lesson: {
            select: {
              subject: {select: {name: true}},
              teacher: {select: {name: true, surname: true}},
              class: {select: {name: true}},
            },
          },
        },
        skip,
        take: limit,
      }),
      this.prisma.exam.count({ where }),
    ]);

    return { exams, count };
  }

    async getAll() {
      const [exams] = await this.prisma.$transaction([
        this.prisma.exam.findMany(),
      ]);

      return exams;
    }
}
