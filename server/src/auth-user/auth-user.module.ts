import {forwardRef, Module} from '@nestjs/common';
import { AuthUserController } from './auth-user.controller';
import {AuthUserService} from "./auth-user.service";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {UsersModule} from "../users/users.module";
import {TokensModule} from "../tokens/tokens.module";

@Module({
  controllers: [AuthUserController],
  providers: [AuthUserService],
  imports: [
      JwtModule.register({
        secret: process.env.JWT_SECRET_KEY || "secret",
        signOptions: {
          expiresIn: "268h"
        }
      }),
      forwardRef(() => UsersModule),
      forwardRef(() => TokensModule),
  ],
  exports: [
      AuthUserService
  ]
})
export class AuthUserModule {}
