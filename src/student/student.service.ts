import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number, queryParams?: Record<string, string>) {
    const skip = (page - 1) * limit;
    const query: Prisma.StudentWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          switch (key) {
            case 'classId':
              query.classId = parseInt(value);
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

    const [students, count] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        where: query,
        include: {
          class: true,
          attendances: true,
          results: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.student.count({ where: query }),
    ]);

    return { students, count };
  }
}
