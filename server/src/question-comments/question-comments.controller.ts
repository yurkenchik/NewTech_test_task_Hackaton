import {
    Body,
    Controller, Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {QuestionCommentsService} from "./question-comments.service";
import {CreateQuestionCommentDto} from "./dto/create-question-comment.dto";
import {QuestionComment} from "./question-comments.entity";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {AuthMutualGuard} from "../guards/auth-mutual.guard";

@Controller('question-comments')
export class QuestionCommentsController {

    constructor(private readonly questionCommentsService: QuestionCommentsService) {
    }

    // @ApiOperation({summary: "C"})
    @UseGuards(AuthMutualGuard)
    @UsePipes(ValidationPipe)
    @ApiResponse({status: HttpStatus.CREATED, type: QuestionComment})
    @Post("/create-comment/:questionId")
    async createCommentToYourQuestion(@Body() createQuestionCommentDto: CreateQuestionCommentDto,
                                      @Req() request,
                                      @Param("questionId") questionId: string) : Promise<QuestionComment>
    {
        try {
            const email = request.user.email
            return this.questionCommentsService.createCommentToQuestion(createQuestionCommentDto, email, questionId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(AuthMutualGuard)
    @UsePipes(ValidationPipe)
    @ApiResponse({status: HttpStatus.CREATED, type: QuestionComment})
    @Post("/create-comment/:questionId")
    async createCommentToSomeonesQuestion(@Body() createQuestionCommentDto: CreateQuestionCommentDto,
                                          @Param("userId") userId: string ,
                                          @Param("questionId") questionId: string) : Promise<QuestionComment>
    {
        try {
            return this.questionCommentsService.createCommentToQuestion(createQuestionCommentDto, userId, questionId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiResponse({status: HttpStatus.CREATED, type: [QuestionComment]})
    @UseGuards(AuthMutualGuard)
    @Get("/get-comments/:questionId")
    async getCommentsToYourPost(@Req() request, @Param("questionId") questionId: string) : Promise<QuestionComment[]>
    {
        try {
            const email = request.user.email
            return this.questionCommentsService.getQuestionComments(email, questionId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiResponse({status: HttpStatus.CREATED, type: [QuestionComment]})
    @UseGuards(AuthMutualGuard)
    @Get("/get-comments/:userId/:questionId")
    async getCommentsToSomeonesPost(@Param("userId") userId: string,
                                    @Param("questionId") questionId: string) : Promise<QuestionComment[]>
    {
        try {
            return this.questionCommentsService.getQuestionComments(userId, questionId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
