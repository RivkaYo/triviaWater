import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "src/entities/question.entity";
import { Answer } from "src/entities/answer.entity";

import { AnswerService } from "./answer.service";
import { AnswerController } from "./answer.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Question])],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
