import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnswerModule } from "src/answer/answer.module";
import { Quiz } from "src/entities/quiz.entity";
import { Question } from "src/entities/question.entity";

import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question]), AnswerModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
