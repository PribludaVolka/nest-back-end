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
        console.log(dto);
        const subject = await this.prisma.subject.create({
            data: {
                ...dto,
            },
        });

        return subject;
  }

    public async update(dto: UpdateSubjectDto) {
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
