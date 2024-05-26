import { Body, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { mapDomainToDTO } from 'src/users/user.converter';
import { UserDTO } from 'src/users/user.dto';
import { UsersService } from 'src/users/user.service';
import { UserLoginDTO } from './authLogin.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async signUp(@Body() userDto: UserDTO): Promise<UserDTO> {
        var finalUser = this.userService.save(userDto)
        return mapDomainToDTO(await finalUser)
    }

    async signIn(@Body() userDto: UserLoginDTO) : Promise<{access_token: string, user: any}> {
        const foundUser = await this.userService.findByEmail(userDto.email)
        if (foundUser != null) {
            if (await bcrypt.compare(userDto.password, foundUser.password) == true) {
                let payload = { sub: foundUser.id, email: foundUser.email, firstName: foundUser.firstName, lastName: foundUser.lastName, role: foundUser.role }
                return {
                    access_token: (await this.jwtService.signAsync(payload)),
                    user: {
                        userId: foundUser.id,
                        email: foundUser.email
                    }
                }
            } else {
                throw new UnauthorizedException(Array.of('Неверный пароль'))
            }
        }
        throw new NotFoundException(Array.of(`Пользователь с почтой ${userDto.email} не найден`))
    }

    async getProfile(userId): Promise<UserDTO> {
        return mapDomainToDTO(await this.userService.findOneById(userId))
    }
}