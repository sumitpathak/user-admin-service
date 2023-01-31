import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Header,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 
   * @param createUserDto {
"teacher": "teacherken@gmail.com" 
"students":
[ "studentjon@gmail.com", "studenthon@gmail.com"
] }
   * @returns 
   */
  @Post('register')
  @Header('Content-Type', 'application/json')
  @HttpCode(204)
  register(@Body() registerUser: { teacher: string; students: string[] }) {
    return this.userService.register(registerUser);
  }

  @Get('users')
  async findAll(): Promise<any> {
    return this.userService.findAll();
  }

  @Get('commonstudents')
  findOne(@Query('teacher') teacher: string[]) {
    return this.userService.findOne(teacher);
  }

  @Patch('suspend')
  @Header('Content-Type', 'application/json')
  @HttpCode(204)
  suspendUser(@Body() updateUserStatus: { student: string }) {
    return this.userService.suspendUser(updateUserStatus);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
