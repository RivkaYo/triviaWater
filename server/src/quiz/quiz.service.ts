import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuestionService } from "src/question/question.service";
import { FilesType, ImageService } from "@hilma/fileshandler-server";

import { Quiz } from "../entities/quiz.entity";
import { CreateQuizDto } from "../dto/quiz.dto";

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly questionService: QuestionService,
    private readonly imageService: ImageService,
  ) {}

  async createQuiz(quiz: CreateQuizDto, creatorId: string, files: FilesType) {
    const { questions, imageId, ...rest } = quiz;
    let imagePath: undefined | string = undefined;
    if (imageId !== undefined) {
      imagePath = await this.saveImage(files, parseInt(imageId));
    }
    const quizCreated = await this.quizRepository.save({
      ...rest,
      imagePath,
      creatorId,
    });

    if (questions) {
      for (const question of questions) {
        await this.questionService.createQuestion(
          {
            ...question,
            quizId: quizCreated.id,
          },
          files,
        );
      }
    }
  }

  async deleteQuiz(id: number) {
    const quiz = await this.quizRepository.findOne({
      where: { id },
    });

    if (!quiz) {
      throw new NotFoundException(
        `quiz with ID ${id} not found and can not be deleted`,
      );
    }
    return this.quizRepository.delete(id);
  }

  getQuizzesByCreatorId(creatorId: string): Promise<Quiz[]> {
    return this.quizRepository
      .createQueryBuilder("quiz")
      .where("quiz.creatorId = :creatorId", { creatorId })
      .loadRelationCountAndMap("quiz.numOfQuestions", "quiz.questions")
      .getMany();
  }

  getSingleQuiz(quizId: number): Promise<Quiz | null> {
    return this.quizRepository
      .createQueryBuilder("quiz")
      .leftJoin("quiz.questions", "questions")
      .leftJoin("questions.answers", "answers")
      .where("quiz.id = :quizId", { quizId })
      .select([
        "quiz.description",
        "quiz.isPublic",
        "quiz.title",
        "quiz.imagePath",
        "questions.title",
        "questions.index",
        "questions.imagePath",
        "answers.answerText",
        "answers.imagePath",
        "answers.index",
        "answers.isCorrect",
        "answers.id",
      ])
      .getOne();
  }

  saveImage(files: FilesType, id: number) {
    return this.imageService.save(files, id);
  }
}
