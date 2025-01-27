import { FilesType, ImageService } from "@hilma/fileshandler-server";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAnswerDto } from "src/dto/answer.dto";
import { Answer } from "src/entities/answer.entity";
import { Repository } from "typeorm";

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    private readonly imageService: ImageService,
  ) {}

  async createAnswer(
    answer: CreateAnswerDto,
    files: FilesType,
  ): Promise<Answer> {
    const { imageId } = answer;
    let imagePath: undefined | string = undefined;
    if (imageId !== undefined) {
      imagePath = await this.saveImage(files, parseInt(imageId));
    }
    try {
      return this.answerRepository.save({
        ...answer,
        imagePath,
      });
    } catch (error) {
      throw new BadRequestException({
        message: "Error creating answer",
        error: (error as Error).message,
      });
    }
  }

  saveImage(files: FilesType, id: number) {
    return this.imageService.save(files, id);
  }
}
