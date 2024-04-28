import { Body, Controller, HttpException, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { AuthAssistantService, TokenResponse } from './auth-assistant.service';
import { RegisterAssistantDto } from './dto/register-assistant.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LoginUserDto } from '../auth-user/dto/login-user.dto';
import { Assistant } from '../assistants/assistants.entity';

@Controller('auth-assistant')
export class AuthAssistantController {

    constructor(private readonly AuthAssistantsService: AuthAssistantService) {
    }

    @UsePipes(ValidationPipe)
    @Post("/registration")
    async registration(registerAssistantDto: RegisterAssistantDto): Promise<[TokenResponse, Assistant]> {
        try {
            return this.AuthAssistantsService.registration(registerAssistantDto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UsePipes(ValidationPipe)
    @Post("/login")
    async login(@Body() loginUserDto: LoginUserDto): Promise<[TokenResponse, Assistant]> {
        try {
            return this.AuthAssistantsService.login(loginUserDto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
