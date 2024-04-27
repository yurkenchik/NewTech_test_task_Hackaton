import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginUserDto {

    @IsEmail({}, {message: "Invalid email address"})
    @IsNotEmpty({message: "Email is required"})
    readonly email: string;

    @Length(6, 122)
    readonly password: string

}