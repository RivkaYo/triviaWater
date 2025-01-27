import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Quiz } from "src/entities/quiz.entity";
import { Score } from "src/entities/score.entity";
import { UserModule } from "@hilma/auth-nest";

import { ScoreController } from "./score.controller";
import { ScoreService } from "./score.service";

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Score]), UserModule],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
