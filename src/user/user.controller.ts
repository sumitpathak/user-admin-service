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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
