import type { Answer } from "./answer.interface";

export interface CurrentQuestion {
  id: number;
  quizId: number;
  title: string;
  index: number;
  imagePath?: string;
  answers: Answer[];
}
