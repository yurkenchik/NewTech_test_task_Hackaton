import {forwardRef, Module} from '@nestjs/common';
import {QuestionComment} from "./question-comments.entity";
import {QuestionCommentsService} from "./question-comments.service";
import {QuestionCommentsController} from "./question-comments.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Question} from "../questions/questions.entity";
import {QuestionsModule} from "../questions/questions.module";

@Module({
    controllers: [QuestionCommentsController],
    providers: [QuestionCommentsService],
    imports: [
        TypeOrmModule.forFeature([QuestionComment, Question]),
        forwardRef(() => QuestionsModule)
    ],
    exports: [
        TypeOrmModule
    ]
})
export class QuestionCommentsModule {}
