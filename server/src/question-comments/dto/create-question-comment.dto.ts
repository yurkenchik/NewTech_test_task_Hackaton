import {IsNotEmpty} from "class-validator";


export class CreateQuestionCommentDto {

    @IsNotEmpty({message: "content is required"})
    readonly content: string

}