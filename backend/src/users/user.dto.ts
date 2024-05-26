import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDTO {
    constructor(firstName: string, lastName: string, email: string, password: string, role: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
      }

    @IsNotEmpty({message: "Поле имя не может быть пустым"})
    firstName: string;

    @IsNotEmpty({message: "Поле фамилия не может быть пустым"})
    lastName: string;

    @IsEmail({}, {message: "Почта некорректна"})
    email: string;

    @MinLength(8, {message: "Длина пароля должна быть >= 8"})
    password: string;

    @IsNotEmpty({message: "Выберите свою роль"})
    role: string;
}