import {Body, Controller, Post, HttpException, HttpStatus, UsePipes, Delete, UseGuards } from '@nestjs/common';
import {AuthUserService} from "./auth-user.service";
import {RegisterUserDto} from "./dto/register-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";
import {LoginUserDto} from "./dto/login-user.dto";
import {AuthUserGuard} from "./auth-user.guard";
import { TokenResponse } from '../auth-assistant/auth-assistant.service';
import { User } from '../users/users.entity';

@Controller('auth-user')
export class AuthUserController {

    constructor(private readonly authUserService: AuthUserService) {
    }

    @UsePipes(ValidationPipe)
    @Post("/registration")
    async registration(@Body() registerUserDto: RegisterUserDto): Promise<[TokenResponse, User]> {
        try {
            return this.authUserService.registration(registerUserDto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UsePipes(ValidationPipe)
    @Post("/login")
    async login(@Body() loginUserDto: LoginUserDto): Promise<[TokenResponse, User]> {
        try {
            return this.authUserService.login(loginUserDto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(AuthUserGuard)
    @Delete("/delete-account")
    async deleteAccount(userId: string): Promise<User> {
        try {
            return this.authUserService.leaveFromAccount(userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
