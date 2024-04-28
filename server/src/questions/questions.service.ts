import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Question} from "./questions.entity";
import {Repository} from "typeorm";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class QuestionsService {

    constructor(@InjectRepository(Question)
                private readonly questionRepository: Repository<Question>,
                private readonly usersService: UsersService) {
    }

    async getQuestions(): Promise<Question[]> {
        return this.questionRepository.find({
            relations: ["user"]
        })
    }

    async getYourQuestion(userId: string, questionId: string): Promise<Question> {
        const user = await this.usersService.getUserById(userId)
        const question = await this.questionRepository.findOne({
            where: {id: questionId, author: user},
            relations: ["answers"]
        })

        return question
    }

    async getSomeonesQuestion(username: string, questionId: string): Promise<Question> {
        const user = await this.usersService.getUserByUsername(username)
        const question = await this.questionRepository.findOne({
            where: {id: questionId, author: user},
            relations: ["answers"]
        })

        return question
    }

    async createQuestion(createQuestionDto: CreateQuestionDto, userId: string): Promise<Question> {

        const user = await this.usersService.getUserById(userId)
        const question = this.questionRepository.create(createQuestionDto)

        question.author = user

        return await this.questionRepository.save(question)

    }

    async deleteQuestion(userId: string, questionId: string): Promise<Question> {

        const user = await this.usersService.getUserById(userId)
        const question = await this.questionRepository.findOne({
            where: {id: questionId, author: user}
        })

        return await this.questionRepository.remove(question)
    }

    async getOneQuestion(userId: string, questionId: string): Promise<Question> {
        const user = await this.usersService.getUserById(userId)
        const question = await this.questionRepository.findOne({
            where: {id: questionId, author: user}
        })

        return question
    }

}
