import { Module, forwardRef } from '@nestjs/common';
import { AuthAssistantController } from './auth-assistant.controller';
import { AuthAssistantService } from './auth-assistant.service';
import { TokensModule } from '../tokens/tokens.module';
import { JwtModule } from '@nestjs/jwt';
import { AssistantsModule } from '../assistants/assistants.module';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [AuthAssistantController],
    providers: [AuthAssistantService],
    imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET_KEY || "secret",
          signOptions: {
            expiresIn: "268h"
          }
        }),
        forwardRef(() => UsersModule),
        forwardRef(() => AssistantsModule),
        forwardRef(() => TokensModule),
    ],
    exports: [
        AuthAssistantService
    ]
})
export class AuthAssistantModule {}
