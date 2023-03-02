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
  RetrieveForNotificationsRequest,
  RetrieveForNotificationsResponse,
  StudentSuspendResponse,
  StudentSuspendRrequest,
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
    return createApiResponse(this.userService, this.userService.findOne, [
      teacher,
    ]);
  }

  @Patch('suspend')
  @Header('Content-Type', 'application/json')
  @HttpCode(204)
  suspendUser(
    @Body() { student }: StudentSuspendRrequest,
  ): Promise<StudentSuspendResponse> {
    return createApiResponse(this.userService, this.userService.suspendUser, [
      student,
    ]);
  }

  @Post('retrievefornotifications')
  @Header('Content-Type', 'application/json')
  @HttpCode(204)
  retrieveNotifications(
    @Body() { teacher, notification }: RetrieveForNotificationsRequest,
  ): Promise<any> {
    console.log(notification);
    return createApiResponse(
      this.userService,
      this.userService.retrieveNotifications,
      [teacher, notification],
    );
  }
}
