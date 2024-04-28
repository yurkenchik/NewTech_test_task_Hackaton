import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    UseGuards
} from '@nestjs/common';
import {QuestionsService} from "./questions.service";
import {AuthUserGuard} from "../guards/auth-user.guard";
import {AuthAssistantGuard} from "../guards/auth-assistant.guarrd";
import { AuthMutualGuard } from 'src/guards/auth-mutual.guard';
import {CreateQuestionDto} from "./dto/create-question.dto";
import {Question} from "./questions.entity";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Request} from "express";

@Controller('questions')
export class QuestionsController {

    constructor(private readonly questionsService: QuestionsService) {
    }

    @ApiOperation({
        summary: "Getting all questions for user",
        description: "This function returns all questions for certain user via user id in params"
    })
    @ApiResponse({status: 200, type: Question})
    @UseGuards(AuthMutualGuard)
    @Get("/get-questions")
    async getQuestions(): Promise<Question[]> {
        try {
            return this.questionsService.getQuestions()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiResponse({status: 200, type: Question})
    @UseGuards(AuthMutualGuard)
    @Get("/get-your-questions")
    async getYourQuestions(@Req() request): Promise<Question[]> {
        try {
            const email = request.user.email
            return this.questionsService.getYourQuestions(email)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({
        summary: "Creation a question",
        description: "This function creates a question that is attached for the user, that creates it via user id from token"
    })
    @ApiResponse({status: 200, type: Question})
    @UseGuards(AuthUserGuard)
    @Post("/create-question")
    async createQuestion(@Body() createQuestionDto: CreateQuestionDto,
                         @Req() request): Promise<Question> {
        try {
            const userId = request.user.email
            return this.questionsService.createQuestion(createQuestionDto, userId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({
        summary: "Getting your question",
        description: "This function returns your question"
    })
    @ApiResponse({status: 200, type: Question})
    @UseGuards(AuthUserGuard)
    @Get("/create-question/:questionId")
    async getYourQuestion(@Req() request,
                          @Param("questionId") questionId: string): Promise<Question> {
        try {
            const userId = request.user.email
            return this.questionsService.getYourQuestion(userId, questionId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({
        summary: "Getting someones question",
        description: "This function returns someones question"
    })
    @ApiResponse({status: 200, type: Question})
    @UseGuards(AuthUserGuard)
    @Get("/get-someones-question/:username/:questionId")
    async getSomeonesQuestion(@Param("username") username: string,
                              @Param("questionId") postId: string): Promise<Question> {
        try {
            return this.questionsService.getSomeonesQuestion(username, postId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }



    @ApiOperation({
        summary: "Getting someones question",
        description: "This function returns someones question"
    })
    @ApiResponse({status: 200, type: Question})
    @UseGuards(AuthUserGuard)
    @Delete("/delete-question/:questionId")
    async deleteQuestion(@Req() request,
                         @Param("questionId")  questionId: string): Promise<Question> {
        try {
            const email = request.user.email
            return this.questionsService.getSomeonesQuestion(email, questionId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(AuthMutualGuard)
    @Put("/set-like/:userId/:questionId")
    async setLike(@Param("userId") userId: string,
                  @Param("questionId") questionId: string): Promise<Question>
    {
        try {
            return this.questionsService.likeQuestion(userId, questionId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(AuthMutualGuard)
    @Put("/set-dislike/:userId/:questionId")
    async setDislike(@Param("userId") userId: string,
                    @Param("questionId") questionId: string): Promise<Question>
    {
        try {
            return this.questionsService.dislikeQuestion(userId, questionId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
