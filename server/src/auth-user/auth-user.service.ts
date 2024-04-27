import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {RegisterUserDto} from "./dto/register-user.dto";
import {BadRequestException} from "@nestjs/common/exceptions/bad-request.exception";
import * as bcrypt from "bcrypt"
import {TokensService} from "../tokens/tokens.service";
import {LoginUserDto} from "./dto/login-user.dto";
import {SupportCategoriesEnum} from "../enums/support-categories.enum";
import { TokenResponse } from '../auth-assistant/auth-assistant.service';
import { User } from '../users/users.entity';

@Injectable()
export class AuthUserService {

    constructor(private readonly usersService: UsersService,
                private readonly tokensService: TokensService) {
    }

    async registration(registerUserDto: RegisterUserDto): Promise<[TokenResponse, User]> {

        const emailChecker = await this.usersService.getUserByEmail(registerUserDto.email)

        if (emailChecker) {
            throw new BadRequestException("User with that email already exists")
        }

        const hashedPassword = await bcrypt.hash(registerUserDto.password, 6)
        const registeredUser = await this.usersService.createUser({
            ...registerUserDto,
            password: hashedPassword,
        })
        const generatedToken = await this.tokensService.generateToken(registeredUser)
        return  [ generatedToken, registeredUser ]
    }

    async validateUser(loginUserDto: LoginUserDto): Promise<User> {
        const user = await this.usersService.getUserByEmail(loginUserDto.email)

        if (!user) {
            throw new BadRequestException("User with that email is not found")
        }

        const comparePasswords = bcrypt.compare(loginUserDto.password, user.password)
        if (user && comparePasswords) {
            return user
        }

    }

    async login(loginUserDto: LoginUserDto): Promise<[TokenResponse, User]> {
        const user = await this.validateUser(loginUserDto)
        const generatedToken = await this.tokensService.generateToken(user)

        return [ generatedToken, user ]

    }

    async leaveFromAccount(id: string): Promise<User> {
        const user = await this.usersService.getUserById(id)

        return this.usersService.deleteUser(id)
    }


}
