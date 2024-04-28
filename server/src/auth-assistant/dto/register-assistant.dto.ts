import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";
import {SupportCategoriesEnum} from "../../enums/support-categories.enum";

export class RegisterAssistantDto {

    @IsEmail({}, {message: "Invalid email address"})
    @IsNotEmpty({message: "Email is required"})
    readonly email: string;

    @IsNotEmpty({message: "Username is required"})
    readonly username: string;

    @IsNotEmpty({message: "Firstname is required"})
    readonly firstname: string;

    @IsString()
    readonly lastname: string;

    @Length(6, 122)
    readonly password: string;

}