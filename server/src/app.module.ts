import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import * as process from "process";
import { ConfigModule } from "@nestjs/config";
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { QuestionsService } from './questions/questions.service';
import { QuestionsModule } from './questions/questions.module';
import { QuestionCommentsService } from './question-comments/question-comments.service';
import { QuestionCommentsController } from './question-comments/question-comments.controller';
import { QuestionCommentsModule } from './question-comments/question-comments.module';
import { QuestionsController } from "./questions/questions.controller";
import { AuthUserService } from './auth-user/auth-user.service';
import { AuthUserController } from './auth-user/auth-user.controller';
import { AuthUserModule } from './auth-user/auth-user.module';
import { TokensService } from './tokens/tokens.service';
import { TokensModule } from './tokens/tokens.module';
import { JwtModule } from '@nestjs/jwt';
import { AssistantsService } from './assistants/assistants.service';
import { AssistantsController } from './assistants/assistants.controller';
import { AssistantsModule } from './assistants/assistants.module';
import { AnswersService } from './answers/answers.service';
import { AnswersModule } from './answers/answers.module';
import { AnswerCommentsService } from './answer-comments/answer-comments.service';
import { AnswerCommentsController } from './answer-comments/answer-comments.controller';
import { AnswerCommentsModule } from './answer-comments/answer-comments.module';
import { AuthAssistantController } from './auth-assistant/auth-assistant.controller';
import { AuthAssistantService } from './auth-assistant/auth-assistant.service';
import { AuthAssistantModule } from './auth-assistant/auth-assistant.module';
import {User} from "./users/users.entity";
import {Question} from "./questions/questions.entity";
import {QuestionComment} from "./question-comments/question-comments.entity";
import {Assistant} from "./assistants/assistants.entity";
import {Answer} from "./answers/answers.entity";
import {AnswerComment} from "./answer-comments/answer-comments.entity";
import {JwtUserMiddleware} from "./middlewares/jwt-user.middleware";

@Module({
  controllers: [
    UsersController,
    QuestionsController,
    QuestionCommentsController,
    AuthUserController,
    AssistantsController,
    AnswerCommentsController,
    AuthAssistantController
  ],
  providers: [
    UsersService,
    QuestionsService,
    QuestionCommentsService,
    AuthUserService,
    TokensService,
    AssistantsService,
    AnswersService,
    AnswerCommentsService,
    AuthAssistantService
  ],
  imports: [
      ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: String(process.env.POSTGRES_PASSWORD),
          database: process.env.POSTGRES_DB,
          entities: [User, Question, QuestionComment, Assistant, Answer, AnswerComment],
          synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
          migrations: [process.env.TYPEORM_MIGRATIONS]
      }),
      UsersModule,
      QuestionsModule,
      QuestionCommentsModule,
      AuthUserModule,
      TokensModule,
      JwtModule.register({
          secret: process.env.JWT_SECRET_KEY || "secret",
          signOptions: {
              expiresIn: "268h"
          }
      }),
      AssistantsModule,
      AnswersModule,
      AnswerCommentsModule,
      AuthAssistantModule
  ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(JwtUserMiddleware).forRoutes("/questions/*", "question-comments/*")
    }
}
