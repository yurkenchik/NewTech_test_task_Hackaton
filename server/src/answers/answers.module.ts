import { Module, forwardRef } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answers.entity';
import { AnswerComment } from '../answer-comments/answer-comments.entity';
import { AssistantsModule } from '../assistants/assistants.module';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
  imports: [
    forwardRef(() => AssistantsModule),
    TypeOrmModule.forFeature([Answer, AnswerComment])
  ],
  exports: [
    TypeOrmModule,
    AnswersService
  ]
})
export class AnswersModule {}
