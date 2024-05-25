import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/app.noguard.decorator';
import { UserDTO } from 'src/users/user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './authLogin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Public()
    @Post('register')
    async signUp(@Body() userDto: UserDTO): Promise<UserDTO> {
        return this.authService.signUp(userDto);
    }

    @Public()
    @Post('login')
    async signIn(@Body() userDto: UserLoginDTO) : Promise<{access_token: string}> {
        return this.authService.signIn(userDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return req.user;
    }
}