import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
