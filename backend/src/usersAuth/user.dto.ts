import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDTO {
    constructor(firstName: string, lastName: string, email: string, password: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
      }

    @IsNotEmpty({message: "Field firstName should not be empty"})
    firstName: string;

    @IsNotEmpty({message: "Field lastName should not be empty"})
    lastName: string;

    @IsEmail({}, {message: "Email is not valid"})
    email: string;

    @MinLength(8, {message: "Password length should be >=8"})
    password: string;
}