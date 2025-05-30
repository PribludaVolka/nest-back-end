import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectDto } from './dto/subject-create.dto';
import { UpdateSubjectDto } from './dto/subject-update.dto';

@Injectable()
export class SubjectService {
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

        const [subjects, count] = await this.prisma.$transaction([
            this.prisma.subject.findMany({
                where,
                include: {
                    lessons: true,
                    teachers: true,
                },
                skip,
                take: limit,
            }),
            this.prisma.subject.count({ where }),
        ]);

        return { subjects, count };
    }

    async getAll() {
        const [subjects] = await this.prisma.$transaction([
            this.prisma.subject.findMany(),
        ]);

        return subjects;
    }

    public async create(dto: CreateSubjectDto) {
         const teachers = await this.prisma.teacher.findMany({
                where: {
                    id: {
                        in: dto.teachers, 
                    },
                },
                select: { id: true },
        });

        const subject = await this.prisma.subject.create({
            data: {
                name: dto.name,
                teachers: {
                    connect: teachers.map((teacher) => ({ id: teacher.id })),
                },
            },
        });

        return subject;
  }

    public async update(dto: UpdateSubjectDto) {
        const teachers = await this.prisma.teacher.findMany({
            where: {
                id: {
                    in: dto.teachers,
                },
            },
            select: { id: true },
        });

        if (teachers.length === 0) {
            throw new Error('Учителя не найдены');
        }

        return this.prisma.subject.update({
            where: { id: dto.id },
            data: {
                name: dto.name,
                teachers: {
                    connect: teachers.map((teacher) => ({ id: teacher.id })),
                },
            },
        });
    }

    public async delete(id: number) {
        return this.prisma.subject.delete({
            where: { id },
        });
    }
}
