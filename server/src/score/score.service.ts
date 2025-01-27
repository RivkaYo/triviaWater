import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Score } from "src/entities/score.entity";
import { Repository } from "typeorm";

import { ScoreDto } from "./score.dto";

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
  ) {}

  saveScore(scoreInfo: ScoreDto) {
    return this.scoreRepository.save(scoreInfo);
  }

  getScoresByQuizId(quizId: number) {
    return this.scoreRepository.findBy({ quizId });
  }
}
