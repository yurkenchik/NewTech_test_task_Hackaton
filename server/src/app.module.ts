import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "process";
import {ConfigModule} from "@nestjs/config";
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { QuestionsService } from './questions/questions.service';
import { QuestionsModule } from './questions/questions.module';
import { QuestionCommentsService } from './question-comments/question-comments.service';
import { QuestionCommentsController } from './question-comments/question-comments.controller';
import { QuestionCommentsModule } from './question-comments/question-comments.module';
import {Question} from "./questions/questions.entity";
import {User} from "./users/users.entity";
import {QuestionComment} from "./question-comments/question-comments.entity";
import {QuestionsController} from "./questions/questions.controller";

@Module({
  controllers: [AppController, UsersController, QuestionsController, QuestionCommentsController],
  providers: [AppService, UsersService, QuestionsService, QuestionCommentsService],
  imports: [
      ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
        entities: [User, Question, QuestionComment]

      }),
      UsersModule,
      QuestionsModule,
      QuestionCommentsModule
  ]
})
export class AppModule {}
