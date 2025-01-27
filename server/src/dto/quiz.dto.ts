import {
  IsString,
  IsBoolean,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
} from "class-validator";
import { Type } from "class-transformer";

import { CreateQuestionDto } from "./question.dto";

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsOptional()
  @IsNumber()
  imageId?: string;

  @IsNotEmpty()
  @IsBoolean()
  isPublic!: boolean;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  @IsArray()
  questions!: CreateQuestionDto[];
}
