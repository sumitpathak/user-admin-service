import { Injectable, Scope } from '@nestjs/common';
import { matches } from 'class-validator';
import { PrismaService } from 'shared/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  CommonStudentsResponse,
  GetUserResponse,
  RegisterResponse,
} from './user.model';

//@Injectable({ scope: Scope.REQUEST })
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(
    teacher: string,
    students: string[],
  ): Promise<RegisterResponse> {
    const userData = [];
    students.map((student) => {
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
        email: teacher,
        updatedAt: new Date(),
        students: {
          create: userData,
        },
      },
    });
    console.log(data);
    return 'This action adds a new user';
  }

  async findAll(): Promise<any> {
    const data = await this.prisma.teacher.findMany({
      include: {
        students: {
          include: {
            Student: true,
          },
        },
      },
    });
    const result = data.map((teacher) => {
      return {
        ...teacher,
        students: teacher.students.map((student) => student.Student.email),
      };
    });
    return { data: result };
  }

  async findOne(teacher: string[]): Promise<CommonStudentsResponse> {
    const teacherList = [];
    if (Array.isArray(teacher)) {
      for (let i = 0; i < teacher.length; i++) {
        teacherList.push({
          email: teacher[i],
        });
      }
    } else {
      teacherList.push({
        email: teacher,
      });
    }
    const data = await this.prisma.student.findMany({
      where: {
        teachers: {
          every: {
            Teacher: {
              AND: teacherList,
            },
          },
        },
      },
      distinct: ['email'],
      select: {
        email: true,
      },
    });
    const studentList = [];
    data.map((studentMail) => {
      studentList.push(studentMail.email);
    });
    //console.log(data.length);
    return { students: studentList };
    //return `This action returns a #${id} user`;
  }

  async suspendUser(updateUserStatus: { student: string }) {
    const getUser = await this.prisma.student.findMany({
      where: {
        email: updateUserStatus.student,
      },
      //distinct: ['email'],
    });
    console.log(getUser);

    await this.prisma.student.update({
      where: {
        id: getUser[0].id,
      },
      data: {
        suspend: !getUser[0].suspend ? true : getUser[0].suspend,
      },
    });
    //return `This action updates a #${id} user`;
  }

  async retrieveNotifications(notiyfyUser: {
    teacher: string;
    notification: string;
  }) {
    //console.log(notiyfyUser);
    const studentMails = this.emailExtractor(notiyfyUser.notification);
    const registerWith = [];
    studentMails.map(async (studentEmail) => {
      const registered = await this.prisma.student.findMany({
        where: {
          email: studentEmail,
          suspend: false,
        },
        distinct: ['email'],
        select: {
          email: true,
        },
      });
      if (registered.length > 0 && registered[0].email) {
        registerWith.push(registered[0].email);
      }
    });

    const registeredWithTeacher = await this.prisma.student.findMany({
      where: {
        teachers: {
          every: {
            Teacher: {
              email: notiyfyUser.teacher,
            },
          },
        },
        suspend: false,
      },
      distinct: ['email'],
      select: {
        email: true,
      },
    });

    console.log('registerWith', registerWith);
    registeredWithTeacher.map((student) => {
      registerWith.push(student.email);
    });

    console.log('registerWith', registerWith);
    return `This action removes a #${notiyfyUser} user `;
  }

  emailExtractor(str: string) {
    const emaillst = str.match(
      /([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
    );
    const uniqueMail = Array.from(new Set(emaillst));
    return emaillst !== null ? uniqueMail : null;
  }
}
