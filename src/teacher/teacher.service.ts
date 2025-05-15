import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number, queryParams?: Record<string, string>) {
    const skip = (page - 1) * limit;
    const query: Prisma.TeacherWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case 'classId':
              query.lessons = {
                some: {
                  classId: parseInt(value),
                },
              };
              break;
            case 'search':
              query.name = {
                contains: value,
                mode: 'insensitive',
              };
              break;
          }
        }
      }
    }

    const [teachers, count] = await this.prisma.$transaction([
      this.prisma.teacher.findMany({
        where: query,
        include: {
          subjects: true,
          classes: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.teacher.count({ where: query }),
    ]);

    return { teachers, count };
  }
}
