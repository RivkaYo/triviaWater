/* eslint-disable nestjs-pedantic/match-methods-to-routes -- because */
import { UseJwtAuth } from "@hilma/auth-nest";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";

import { ScoreDto } from "./score.dto";
import { ScoreService } from "./score.service";

@Controller("score")
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post("save-score")
  @UseJwtAuth({ roles: ["CREATOR"] })
  saveScore(@Body() scoreInfo: ScoreDto) {
    return this.scoreService.saveScore(scoreInfo);
  }

  @Get(":quizId")
  getScoresByQuizId(@Param("quizId", ParseIntPipe) quizId: number) {
    return this.scoreService.getScoresByQuizId(quizId);
  }
}
