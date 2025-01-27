import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
} from "class-validator";

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  index!: number;

  @IsNotEmpty()
  @IsString()
  answerText!: string;

  @IsNotEmpty()
  @IsBoolean()
  isCorrect!: boolean;

  @IsOptional()
  @IsNumber()
  imageId?: string;

  @IsOptional()
  @IsNumber()
  questionId!: number;
}
