import type { NewQuestion, QuestionForQuiz } from "./question.interface";

export interface Quiz {
  id: number;
  creatorId: string;
  title: string;
  description: string;
  imagePath?: string;
  isPublic: boolean;
  createdAt: Date;
}

export interface FullQuiz {
  questions: QuestionForQuiz[];
  id: number;
  creatorId: string;
  title: string;
  description: string;
  imagePath?: string | null;
  isPublic: boolean;
  createdAt: Date;
}

export type NewQuiz = Omit<
  FullQuiz,
  "id" | "creatorId" | "createdAt" | "questions"
> & {
  questions: NewQuestion[];
};
