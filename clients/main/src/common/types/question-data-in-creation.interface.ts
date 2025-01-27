import type { AnswerInCreation } from "./answer-in-creation.interface";

export interface QuestionDataInCreation {
  title: string;
  image?: string;
  answers: AnswerInCreation[];
  imageId?: number;
}
