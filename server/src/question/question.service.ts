import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateQuestionDto } from "src/dto/question.dto";
import { Question } from "src/entities/question.entity";
import { Repository } from "typeorm";
import { ImageService, type FilesType } from "@hilma/fileshandler-server";

import { AnswerService } from "../answer/answer.service";

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly answerService: AnswerService,
    private readonly imageService: ImageService,
  ) {}

  async createQuestion(question: CreateQuestionDto, files: FilesType) {
    const { answers, imageId, ...rest } = question;
    let imagePath: undefined | string = undefined;
    if (imageId !== undefined) {
      imagePath = await this.saveImage(files, parseInt(imageId));
    }
    try {
      const questionCreated = await this.questionRepository.save({
        ...rest,
        imagePath,
      });

      if (answers) {
        for (const answer of answers) {
          await this.answerService.createAnswer(
            {
              ...answer,
              questionId: questionCreated.id,
            },
            files,
          );
        }
      }
    } catch (error) {
      throw new BadRequestException({
        message: "Error creating question",
        error: (error as Error).message,
      });
    }
  }

  saveImage(files: FilesType, id: number) {
    return this.imageService.save(files, id);
  }
}
