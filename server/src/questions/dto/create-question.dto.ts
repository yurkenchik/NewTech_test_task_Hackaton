import {IsNotEmpty, Length} from "class-validator";


export class CreateQuestionDto {

    @IsNotEmpty({message: "Question has to have a title"})
    @Length(1, 50)
    readonly topic: string

    @IsNotEmpty({message: "question cannot be empty"})
    readonly content: string

}