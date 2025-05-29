import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeacherService {
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

    const [teachers, count] = await this.prisma.$transaction([
      this.prisma.teacher.findMany({
        where,
        include: {
          subjects: true,
          classes: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.teacher.count({ where }),
    ]);

    return { teachers, count };
  }

  async getAll() {
    const [teachers] = await this.prisma.$transaction([
      this.prisma.teacher.findMany(),
    ]);

    return teachers;
  }

  async getSelectTeacher() {
    const [teachers] = await this.prisma.$transaction([
      this.prisma.teacher.findMany({
        select: { id: true, name: true, surname: true },
      }),
    ]);


    return teachers;
  }
}
