export interface Answer {
  id: number;
  questionId: number;
  answerText: string;
  imagePath?: string;
  index: number;
  isCorrect: boolean;
}

export type NewAnswer = Omit<Answer, "id" | "questionId">;
