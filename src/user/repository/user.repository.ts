import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/prisma/prisma.service';

@Injectable()
export default class UserRepository {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }
}
