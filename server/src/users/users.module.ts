import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {AuthUserModule} from "../auth-user/auth-user.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthUserModule),
        JwtModule
    ],
    exports: [
        TypeOrmModule,
        UsersService
    ]
})
export class UsersModule {}
