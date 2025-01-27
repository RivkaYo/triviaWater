import type { NewAnswer, Answer } from "./answer.interface";

export interface Question {
  id: number;
  quizId: number;
  title: string;
  imagePath?: string;
  index: number;
}
export interface QuestionForQuiz extends Question {
  answers: Answer[];
}

export type NewQuestion = Omit<QuestionForQuiz, "id" | "quizId" | "answers"> & {
  answers: NewAnswer[];
};
