import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, UserSex } from '@prisma/client';
import { CreateStudentDto } from './dto/create-student.dto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class StudentService {
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

    const [students, count] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        where,
        include: {
          class: true,
          attendances: true,
          results: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.student.count({ where }),
    ]);

    return { students, count };
  }

  async getAll() {
    const [students] = await this.prisma.$transaction([
      this.prisma.student.findMany(),
    ]);

    return students;
  }

  public async create(dto: CreateStudentDto, image?: Express.Multer.File) {
      let img = {url: ''};
      if(image) img = await this.fileService.uploadToCloudinary(image, FileType.IMAGE);
  
      const student = await this.prisma.student.create({
        data: {
          id: "student" + Number(Math.random() * 1000),
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
          gradeId: Number(dto.gradeId),
          classId: Number(dto.classId),
          parentId: dto.parentId,
        },
      });
  
      return student;
    }
  
    public async delete(id: string) {
      return this.prisma.student.delete({
        where: { id },
      });
    }
  
    public async getOne(id: string) {
      const [teachers] = await this.prisma.$transaction([
        this.prisma.student.findMany({
          where: {id},
          include: {
            class: true
          }
        }),
      ]);
  
      return teachers;
    }
}
