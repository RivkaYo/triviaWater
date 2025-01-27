import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  InternalServerErrorException,
  Delete,
  Param,
  ParseIntPipe,
  NotFoundException,
  UploadedFiles,
} from "@nestjs/common";
import { Quiz } from "src/entities/quiz.entity";
import { RequestUser, RequestUserType, UseJwtAuth } from "@hilma/auth-nest";
import { FilesType, UseFilesHandler } from "@hilma/fileshandler-server";

import { CreateQuizDto } from "../dto/quiz.dto";

import { QuizService } from "./quiz.service";
/* eslint-disable nestjs-pedantic/match-methods-to-routes -- because */

@Controller("quiz")
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Delete(":id")
  @UseJwtAuth({ roles: ["CREATOR"] })
  deleteQuizById(@Param("id", ParseIntPipe) id: number) {
    return this.quizService.deleteQuiz(id);
  }

  @Get()
  @UseJwtAuth({ roles: ["CREATOR"] })
  async getQuizzesByCreatorId(
    @RequestUser() { id }: RequestUserType,
  ): Promise<Quiz[]> {
    try {
      return await this.quizService.getQuizzesByCreatorId(id);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get quizzes: ${error}`);
    }
  }

  @Get(":quizId")
  async getSingleQuiz(@Param("quizId", ParseIntPipe) quizId: number) {
    try {
      const quiz = await this.quizService.getSingleQuiz(quizId);
      if (!quiz)
        throw new NotFoundException(`Quiz with ID ${quizId} not found`);
      return quiz;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`failed to the quiz: ${error}`);
    }
  }

  @Post("create")
  @UseJwtAuth({ roles: ["CREATOR"] })
  @UseFilesHandler(100)
  async createQuiz(
    @Body() quiz: CreateQuizDto,
    @UploadedFiles() files: FilesType,
    @RequestUser() requestUser: RequestUserType,
  ) {
    try {
      return await this.quizService.createQuiz(quiz, requestUser.id, files);
    } catch (error) {
      throw new BadRequestException({
        message: "Error creating quiz",
        error: (error as Error).message,
      });
    }
  }
}
