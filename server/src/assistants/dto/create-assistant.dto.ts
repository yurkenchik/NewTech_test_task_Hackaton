import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class CreateAssistantDto {

    @IsEmail({}, {message: "Invalid email address"})
    @IsNotEmpty({message: "Email is required"})
    readonly email: string;

    @IsNotEmpty({message: "username can not be empty"})
    readonly username: string;

    @IsNotEmpty({message: "firstname can not be empty"})
    @IsNotEmpty({message: "Firstname is required"})
    readonly firstname: string;

    @IsString()
    readonly lastname: string;

    @Length(6, 122)
    readonly password: string
}