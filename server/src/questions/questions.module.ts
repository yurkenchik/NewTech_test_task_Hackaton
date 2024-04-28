import {forwardRef, Module} from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import {QuestionsService} from "./questions.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Question} from "./questions.entity";
import {UsersModule} from "../users/users.module";
import {QuestionComment} from "../question-comments/question-comments.entity";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [
      forwardRef(() => UsersModule),
      TypeOrmModule.forFeature([Question, QuestionComment]),
      forwardRef(() => JwtModule)
  ],
    exports: [
        TypeOrmModule,
        QuestionsService
    ]
})
export class QuestionsModule {}
