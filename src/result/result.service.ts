import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResultService {
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

        const [resultsResponse, count] = await this.prisma.$transaction([
            this.prisma.result.findMany({
                where,
                include: {
                    student: {select: {name: true, surname: true} },
                    exam : {
                        include: {
                            lesson: {
                                select: {
                                    class : {select: {name: true}},
                                    teacher : {select: {name: true, surname: true}}
                                },
                            },
                        },
                    },
                    assignment : {
                        include: {
                            lesson: {
                                select: {
                                    class : {select: {name: true}},
                                    teacher : {select: {name: true, surname: true}}
                                },
                            },
                        },
                    },
                },
                skip,
                take: limit,
            }),
            this.prisma.result.count({ where }),
        ]);

        const results = resultsResponse.map(item => {
            const assessment = item.exam || item.assignment

            if(!assessment) return null;

            const isExam = "startTime" in assessment;

            return {
                id: item.id,
                title: assessment.title,
                studentName: item.student.name,
                studentSurname: item.student.surname,
                teacherName: assessment.lesson.teacher.name,
                teacherSurname: assessment.lesson.teacher.surname,
                score: item.score,
                className:assessment.lesson.class.name,
                startTime: isExam ? assessment.startTime : assessment.startDate,
            };
        });
        return { results, count };
    }
}
