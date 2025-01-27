import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class ScoreDto {
  @IsNumber()
  @IsNotEmpty()
  score!: number;

  @IsNotEmpty()
  @IsString()
  playerName!: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quizId!: number;
}
