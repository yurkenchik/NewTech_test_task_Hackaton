import { Module } from '@nestjs/common';
import {QuestionComment} from "./question-comments.entity";
import {QuestionCommentsService} from "./question-comments.service";
import {QuestionCommentsController} from "./question-comments.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Question} from "../questions/questions.entity";

@Module({
    controllers: [QuestionCommentsController],
    providers: [QuestionCommentsService],
    imports: [
        TypeOrmModule.forFeature([QuestionComment, Question])
    ],
    exports: [
        TypeOrmModule
    ]
})
export class QuestionCommentsModule {}
