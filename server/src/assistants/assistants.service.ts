import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assistant } from './assistants.entity';
import { Repository } from 'typeorm';
import { CreateAssistantDto } from './dto/create-assistant.dto';

@Injectable()
export class AssistantsService {

    constructor(@InjectRepository(Assistant)
                private readonly assistantRepository: Repository<Assistant>) {
    }

    async createAssistant(createAssistantDto: CreateAssistantDto): Promise<Assistant> {
        const assistant = this.assistantRepository.create(createAssistantDto)

        return await this.assistantRepository.save(assistant)
    }

    async getAssistantByEmail(email: string): Promise<Assistant> {

        const assistant = await this.assistantRepository.findOne({
          where: {email: email}
        })

        return assistant
    }

    async getAssistantById(id: string): Promise<Assistant> {

        const assistant = await this.assistantRepository.findOne({
          where: {id: id}
        })

        return assistant
    }

    async getAssistants() {
        return await this.assistantRepository.find()
    }

}