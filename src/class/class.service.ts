import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassService {
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

  const [classes, count] = await this.prisma.$transaction([
    this.prisma.class.findMany({
      where,
      include: {
        announcements: true,
        events: true,
        lessons: true,
        students: true,
        supervisor: true,
      },
      skip,
      take: limit,
    }),
    this.prisma.class.count({ where }),
  ]);

  return { classes, count };
}

}
