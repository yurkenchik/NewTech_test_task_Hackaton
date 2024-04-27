import { BadRequestException, Injectable } from '@nestjs/common';
import { AssistantsService } from '../assistants/assistants.service';
import { TokensService } from '../tokens/tokens.service';
import { RegisterAssistantDto } from './dto/register-assistant.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt"
import { LoginAssistantDto } from './dto/login-assistant.dto';
import { Assistant } from '../assistants/assistants.entity';

export interface TokenResponse {
    token: string,
}

@Injectable()
export class AuthAssistantService {

    constructor(private readonly assistantsService: AssistantsService,
                private readonly usersService: UsersService,
                private readonly tokensService: TokensService) {
    }

    async registration(registerAssistantDto: RegisterAssistantDto): Promise<[TokenResponse, Assistant]> {

        const assistant = await this.assistantsService.getAssistantByEmail(registerAssistantDto.email)
        const user = await this.usersService.getUserByEmail(registerAssistantDto.email)

        if (assistant) {
          throw new BadRequestException("Assistant with that email already exists")
        }

        if (user) {
          throw new BadRequestException("That email is already used by user")
        }

        const hashedPassword = bcrypt.hash(registerAssistantDto.password, 6)
        const registeredAssistant = await this.assistantsService.createAssistant({
          ...registerAssistantDto,
          password: hashedPassword
        })
        const generatedToken = await this.tokensService.generateToken(registeredAssistant)

        return [ generatedToken, registeredAssistant ]

    }

    private async validateAssistant(loginAssistantDto: LoginAssistantDto): Promise<Assistant> {

        const assistant = await this.assistantsService.getAssistantByEmail(loginAssistantDto.email)

        if (!assistant) {
          throw new BadRequestException("User with that email is not found")
        }

        const comparePasswords = bcrypt.compare(loginAssistantDto.password, assistant.password)
        if (assistant && comparePasswords) {
          return assistant
        }
    }

    async login(loginAssistantDto: LoginAssistantDto): Promise<[TokenResponse, Assistant]> {

        const assistant = await this.validateAssistant(loginAssistantDto)
        const generatedToken = await this.tokensService.generateToken(assistant)

        return [ generatedToken, assistant ]

    }

}
