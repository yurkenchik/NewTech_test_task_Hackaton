import {Controller, Get, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import {AssistantsService} from "./assistants.service";
import {AuthAssistantGuard} from "../guards/auth-assistant.guarrd";

@Controller('assistants')
export class AssistantsController {

    constructor(private readonly assistantsService: AssistantsService) {
    }

    @UseGuards(AuthAssistantGuard)
    @Get("/get-assistants")
    async getAssistants() {
        try  {
            return this.assistantsService.getAssistants()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
