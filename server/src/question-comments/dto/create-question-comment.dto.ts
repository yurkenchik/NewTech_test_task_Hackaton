import {IsNotEmpty} from "class-validator";


export class CreateQuestionCommentDto {

    @IsNotEmpty({message: "topic is required"})
    readonly topic: string;

    @IsNotEmpty({message: "content is required"})
    readonly content: string

}