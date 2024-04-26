import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({message: "username can not be empty"})
    readonly username: string;

    @IsNotEmpty({message: "firstname can not be empty"})
    @IsNotEmpty({message: "Firstname is required"})
    readonly firstname: string;

    @IsString()
    readonly lastname: string;

    @IsEmail({}, {message: "Invalid email address"})
    @IsNotEmpty({message: "Email is required"})
    readonly email: string;

}