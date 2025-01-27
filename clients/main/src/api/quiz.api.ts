import axios from "axios";
import { type FilesUploader } from "@hilma/fileshandler-client";

import { type QuizItemType } from "../common/types/quiz-item.interface";
import type { NewQuiz, FullQuiz } from "../common/types/quiz.interface";

export const fetchQuizzesByCreator = async (): Promise<QuizItemType[]> => {
  const response = await axios.get<QuizItemType[]>(`/api/quiz`);
  return response.data;
};

export const getSingleQuiz = async (quizId: number) => {
  const response = await axios.get<FullQuiz>(`/api/quiz/${quizId}`);
  return response.data;
};

export const deleteQuiz = async (id: number) => {
  const response = await axios.delete(`/api/quiz/${id}`);
  return response.data;
};

export const createQuiz = async ({
  newQuiz,
  filesUploader,
}: {
  newQuiz: NewQuiz;
  filesUploader: FilesUploader;
}) => {
  const response = await filesUploader.post("api/quiz/create", newQuiz);
  return response.data;
};
