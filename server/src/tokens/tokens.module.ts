import { Module } from '@nestjs/common';
import {TokensService} from "./tokens.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.entity";
import {JwtModule} from "@nestjs/jwt";
import {forwardRef} from "@nestjs/common/utils/forward-ref.util";

@Module({
    providers: [TokensService],
    imports: [
        forwardRef(() => JwtModule)
    ],
    exports: [
        TokensService,
    ]
})
export class TokensModule {}
