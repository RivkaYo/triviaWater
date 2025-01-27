import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Quiz } from "src/entities/quiz.entity";
import { Creator } from "src/entities/creator.entity";
import { QuestionModule } from "src/question/question.module";
import { UserModule } from "@hilma/auth-nest";

import { QuizService } from "./quiz.service";
import { QuizController } from "./quiz.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Creator]),
    QuestionModule,
    UserModule,
  ],
  providers: [QuizService],
  controllers: [QuizController],
})
export class QuizModule {}
