import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'shared/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(registerUser: { teacher: string; students: string[] }) {
    const userData = [];
    registerUser.students.map((student) => {
      const data = {
        Student: {
          create: {
            updatedAt: new Date(),
            email: student,
            suspend: false,
          },
        },
      };
      userData.push(data);
    });
    const data = await this.prisma.teacher.create({
      data: {
        email: registerUser.teacher,
        updatedAt: new Date(),
        students: {
          create: userData,
        },
      },
    });
    console.log(data);
    return 'This action adds a new user';
  }

  async findAll() {
    const data = await this.prisma.teacher.findMany({
      include: {
        students: {
          include: {
            Student: true,
          },
        },
      },
    });
    console.log(JSON.stringify(data));
    const result = data.map((teacher) => {
      return {
        //...teacher,
        students: teacher.students.map((student) => student.Student.email),
      };
    });
    console.log(result);
    //return `This action returns all user`;
  }

  async findOne(teacher: string[]) {
    const teacherList = [];
    if (Array.isArray(teacher)) {
      console.log('------------------');
      for (let i = 0; i < teacher.length; i++) {
        teacherList.push({
          email: {
            equals: teacher[i],
          },
        });
      }
    } else {
      teacherList.push({
        email: {
          equals: teacher,
        },
      });
    }
    const data = await this.prisma.student.findMany({
      where: {
        teachers: {
          every: {
            Teacher: {
              OR: teacherList,
            },
          },
        },
      },
      distinct: ['email'],
      select: {
        email: true,
      },
    });
    console.log(data);
    //return `This action returns a #${id} user`;
  }

  async suspendUser(updateUserStatus: { student: string }) {
    const getUser = await this.prisma.student.findMany({
      where: {
        email: updateUserStatus.student,
      },
    });
    console.log(getUser);

    // await this.prisma.student.update({
    //   where: {},
    //   data: undefined,
    // });
    //return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user `;
  }
}
