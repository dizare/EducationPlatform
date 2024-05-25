import { IsEmail, MinLength } from 'class-validator';

export class UserLoginDTO {
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
      }

    @IsEmail({}, {message: "Email is not valid"})
    email: string;

    @MinLength(8, {message: "Password length should be >=8"})
    password: string;
}