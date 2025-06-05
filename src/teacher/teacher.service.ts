import { Injectable } from '@nestjs/common';
import { FileService, FileType } from 'src/file/file.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeacherDto } from './dto/teacher-create.dto';
import { UserSex } from '@prisma/client';

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService, private readonly fileService: FileService) {}

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

  public async create(dto: CreateTeacherDto, image?: Express.Multer.File) {
    let img = {url: ''};
    if(image) img = await this.fileService.uploadToCloudinary(image, FileType.IMAGE);

    const numberSubjects = dto.subjects.map((s) => Number(s));

    const subjects = await this.prisma.subject.findMany({
      where: {
        id: {
          in: numberSubjects, 
        },
      },
      select: { id: true },
    });

    const teacher = await this.prisma.teacher.create({
      data: {
        id: "teacher" + Number(Math.random() * 1000),
        name: dto.name,
        username: dto.username,
        surname: dto.surname,
        email: dto.email || null,
        phone: dto.phone || null,
        address: dto.address,
        img: img.url || null,
        bloodType: dto.bloodType,
        sex: dto.sex === 'MALE' ? UserSex.MALE : UserSex.FEMALE,
        birthday: dto.birthday,
        subjects: {
          connect: subjects.map((s) => ({ id: s.id })),
        },
      },
    });

    return teacher;
  }

  public async delete(id: string) {
    return this.prisma.teacher.delete({
      where: { id },
    });
  }

  public async getOne(id: string) {
    const [teachers] = await this.prisma.$transaction([
      this.prisma.teacher.findMany({
        where: {id},
        include: {
          subjects: true,
          classes: true,
          lessons: true
        },
      }),
    ]);

    return teachers;
  }
}
