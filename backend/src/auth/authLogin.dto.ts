import { IsEmail, MinLength } from 'class-validator';

export class UserLoginDTO {
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
      }

    @IsEmail({}, {message: "Почта некорректна"})
    email: string;

    @MinLength(8, {message: "Длина пароля должна быть >= 8"})
    password: string;
}