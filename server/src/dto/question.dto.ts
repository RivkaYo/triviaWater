import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { CreateAnswerDto } from "./answer.dto";

export class CreateQuestionDto {
  @IsOptional()
  @IsNumber()
  quizId!: number;

  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsNumber()
  imageId?: string;

  @IsNotEmpty()
  @IsNumber()
  index!: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers!: CreateAnswerDto[];
}
