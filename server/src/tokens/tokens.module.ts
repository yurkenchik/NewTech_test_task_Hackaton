import { Module } from '@nestjs/common';
import {TokensService} from "./tokens.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.entity";

@Module({
    providers: [TokensService],
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    exports: [
        TokensService,
        TypeOrmModule
    ]
})
export class TokensModule {}
