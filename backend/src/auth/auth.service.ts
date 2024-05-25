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

    async signIn(@Body() userDto: UserLoginDTO) : Promise<{access_token: string}> {
        const foundUser = await this.userService.findByEmail(userDto.email)
        if (foundUser != null) {
            if (bcrypt.compare(userDto.password, foundUser.password)) {
                let payload = { sub: foundUser.id, username: foundUser.email }
                return {
                    access_token: await this.jwtService.signAsync(payload)
                }
            } else {
                throw new UnauthorizedException('Password incorrect')
            }
        }
        throw new NotFoundException(`User with email=${userDto.email} not found`)
    }
}
