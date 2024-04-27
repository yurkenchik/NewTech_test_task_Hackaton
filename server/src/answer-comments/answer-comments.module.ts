import { Module } from '@nestjs/common';
import { AnswerCommentsController } from './answer-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerComment } from './answer-comments.entity';
import { AnswerCommentsService } from './answer-comments.service';

@Module({
  controllers: [AnswerCommentsController],
  providers: [AnswerCommentsService],
  imports: [
    TypeOrmModule.forFeature([AnswerComment])
  ],
  exports: [
    TypeOrmModule,
    AnswerCommentsService
  ]
})
export class AnswerCommentsModule {}
