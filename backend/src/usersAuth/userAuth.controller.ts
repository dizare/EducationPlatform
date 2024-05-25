import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './userAuth.service';
import { User } from './user.entity';
import { UserDTO } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('getById/:id')
  getUserParam(@Param() params: any): Promise<User> {
    return this.userService.findOneById(params.id)
  }

  @Post('register')
  uploadUser(@Body() userDto: UserDTO): Promise<User | string> {
    return this.userService.save(userDto)
  }

  @Post('login')
  loginUser(@Body() userDto: UserDTO): Promise<boolean> {
    return this.userService.existsByEmailAndPassword(userDto.email, userDto.password);
  }
  
  @Get('getById')
  getUserQuery(@Query('id') id: number) {
    return `String: ${id}`
  }
}
