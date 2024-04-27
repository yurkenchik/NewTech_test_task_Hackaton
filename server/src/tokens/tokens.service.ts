import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/users.entity";
import { Assistant } from '../assistants/assistants.entity';

@Injectable()
export class TokensService {

    constructor(private readonly jwtService: JwtService) {
    }

    async generateToken(userData?: User | Assistant) {

        const payload = {
            id: userData.id,
            email: userData.email,
            username: userData.username,
            firstname: userData.firstname,
            lastname: userData.lastname,
            role: userData.role,
            supportCategories: userData.supportCategories
        }

        const token = this.jwtService.sign(payload)
        return {
            token: token
        }

    }

}
