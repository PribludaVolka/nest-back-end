import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GradeService {
    constructor(private readonly prisma: PrismaService) {}

    async getSelectGrades() {
        const [grades] = await this.prisma.$transaction([
            this.prisma.grade.findMany({
                select: { id: true, level: true },
            }),
        ]);


        return grades;
    }
}
