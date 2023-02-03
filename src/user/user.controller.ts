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
import {
  CommonStudentsResponse,
  GetUserResponse,
  RegisterRequest,
  RegisterResponse,
} from './user.model';
import { createApiResponse } from 'shared/src/create-responses/api_response';

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
  register(
    @Body() { teacher, students }: RegisterRequest,
  ): Promise<RegisterResponse> {
    return createApiResponse(this.userService, this.userService.register, [
      teacher,
      students,
    ]);
  }

  @Get('users')
  async findAll(): Promise<GetUserResponse> {
    return createApiResponse(this.userService, this.userService.findAll);
  }

  @Get('commonstudents')
  findOne(
    @Query('teacher') teacher: string[],
  ): Promise<CommonStudentsResponse> {
    //return this.userService.findOne(teacher);
    return createApiResponse(this.userService, this.userService.findOne, [
      teacher,
    ]);
  }

  @Patch('suspend')
  @Header('Content-Type', 'application/json')
  @HttpCode(204)
  suspendUser(@Body() updateUserStatus: { student: string }) {
    return this.userService.suspendUser(updateUserStatus);
  }

  @Post('retrievefornotifications')
  @Header('Content-Type', 'application/json')
  @HttpCode(204)
  retrieveNotifications(
    @Body() notiyfyUser: { teacher: string; notification: string },
  ) {
    return this.userService.retrieveNotifications(notiyfyUser);
  }
}
