import { Controller, Get, Param, Query } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('getById/:id')
  getUserParam(@Param() params: any): Promise<User> {
    return this.userService.findOneById(params.id)
  }

  @Get('getById')
  getUserQuery(@Query('id') id: number) {
    return `String: ${id}`
  }
}
