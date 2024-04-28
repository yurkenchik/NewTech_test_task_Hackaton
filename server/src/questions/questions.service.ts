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
            relations: ["author"]
        })
    }

    async getYourQuestions(email: string): Promise<Question[]> {
        const user = await this.usersService.getUserByEmail(email)
        const questions = await this.questionRepository.find({
            where: {author: user}
        })

        return questions
    }

    async getYourQuestion(email: string, questionId: string): Promise<Question> {
        const user = await this.usersService.getUserByEmail(email)
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

    async createQuestion(createQuestionDto: CreateQuestionDto, email: string): Promise<Question> {

        const user = await this.usersService.getUserByEmail(email)
        console.log(user)
        const question = this.questionRepository.create(createQuestionDto)

        question.author = user

        return await this.questionRepository.save(question)

    }

    async deleteQuestion(email: string, questionId: string): Promise<Question> {

        const user = await this.usersService.getUserByEmail(email)
        const question = await this.questionRepository.findOne({
            where: {id: questionId, author: user}
        })

        return await this.questionRepository.remove(question)
    }

    async getOneQuestion(userEmail: string, questionId: string): Promise<Question> {
        const user = await this.usersService.getUserByEmail(userEmail)
        const question = await this.questionRepository.findOne({
            where: {id: questionId, author: user}
        })

        return question
    }

    async likeQuestion(userEmail: string, questionId: string): Promise<Question> {
        const user = await this.usersService.getUserByEmail(userEmail)
        const question = await this.questionRepository.findOne({
            where: {id: questionId, author: user}
        })

        question.likes += question.likes

        return await this.questionRepository.save(question)
    }

    async dislikeQuestion(userEmail: string, questionId: string): Promise<Question> {
        const user = await this.usersService.getUserByEmail(userEmail)
        const question = await this.questionRepository.findOne({
            where: {id: questionId, author: user}
        })

        question.dislikes += question.dislikes

        return await this.questionRepository.save(question)
    }

}
