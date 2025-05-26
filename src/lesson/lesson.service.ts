import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonService {
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

        const [lessons, count] = await this.prisma.$transaction([
            this.prisma.lesson.findMany({
                where,
                include: {
                    assignments: true,
                    attendances: true,
                    exams: true,
                    teacher: true,
                    subject: true,
                    class: true,
                },
                skip,
                take: limit,
            }),
            this.prisma.lesson.count({ where }),
        ]);

        return { lessons, count };
    }

    async getAll() {
        const [lessons] = await this.prisma.$transaction([
            this.prisma.lesson.findMany(),
        ]);

        return lessons;
    }
}
