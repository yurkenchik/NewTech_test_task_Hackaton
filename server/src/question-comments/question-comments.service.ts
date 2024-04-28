import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {QuestionComment} from "./question-comments.entity";
import {Repository} from "typeorm";
import {QuestionsService} from "../questions/questions.service";
import {CreateQuestionCommentDto} from "./dto/create-question-comment.dto";

@Injectable()
export class QuestionCommentsService {

    constructor(@InjectRepository(QuestionComment)
                private readonly questionCommentsRepository: Repository<QuestionComment>,
                private readonly questionsService: QuestionsService) {
    }

    async createCommentToQuestion(createQuestionCommentDto: CreateQuestionCommentDto,
                                  userEmail: string,
                                  questionId: string): Promise<QuestionComment>
    {
        const question = await this.questionsService.getOneQuestion(userEmail, questionId)
        const comment = this.questionCommentsRepository.create(createQuestionCommentDto)

        comment.question = question

        return comment

    }

    async getQuestionComments(email: string, questionId: string): Promise<QuestionComment[]> {
        const question = await this.questionsService.getOneQuestion(email, questionId)
        const questionComments = await this.questionCommentsRepository.find({
            where: {question: question}
        })

        return questionComments
    }

}
