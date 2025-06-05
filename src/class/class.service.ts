import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassDto } from './dto/class-create.dto';
import { UpdateClassDto } from './dto/class-update.dto';

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

  async getAll() {
    const [classes] = await this.prisma.$transaction([
      this.prisma.class.findMany(),
    ]);

    return classes;
  }

  public async create(dto: CreateClassDto) {
    const classes = await this.prisma.class.create({
      data: {
        ...dto
      },
    });
  
    return classes;
  }
  
  public async update(dto: UpdateClassDto) {
    return this.prisma.class.update({
      where: { id: dto.id },
      data: {
        name: dto.name,
        capacity: dto.capacity,
        supervisorId: dto.supervisorId,
        gradeId: dto.gradeId
      },
    });
  }
  
  public async delete(id: number) {
    return this.prisma.class.delete({
      where: { id },
    });
  }

  async getSelectClasses() {
    const [classes] = await this.prisma.$transaction([
      this.prisma.class.findMany({
        include: { _count: { select: { students: true } } },
      })
    ]);


    return classes;
  }
}
