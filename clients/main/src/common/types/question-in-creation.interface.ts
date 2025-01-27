import type { QuestionDataInCreation } from "./question-data-in-creation.interface";

export interface QuestionInCreation {
  tempId: number;
  questionData: QuestionDataInCreation;
}
