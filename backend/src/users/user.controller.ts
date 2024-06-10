import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { Public } from 'src/app.noguard.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Get('getById/:id')
  getUserParam(@Param() params: any): Promise<User> {
    return this.userService.findOneById(params.id)
  }

  @Get('getById')
  getUserQuery(@Query('id') id: number) {
    return `String: ${id}`
  }

  @Public()
  @Put('updateEmail/:email')
  async putEmailData(@Param('email') email: string, @Body() body: { newEmail: string }): Promise<void> {
    await this.userService.updateEmail(email, body.newEmail);
  }
}
