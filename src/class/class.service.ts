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
          console.log(dto);
          const subject = await this.prisma.subject.create({
              data: {
                  ...dto,
              },
          });
  
          return subject;
    }
  
      public async update(dto: UpdateClassDto) {
          return this.prisma.subject.update({
              where: { id: dto.id },
              data: {
              name: dto.name,
              },
          });
      }
  
      public async delete(id: number) {
          console.log(id);
          return this.prisma.subject.delete({
              where: { id },
          });
      }
}
