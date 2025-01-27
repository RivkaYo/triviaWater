import { useQuery } from "@tanstack/react-query";

import { type QuizItemType } from "../../types/quiz-item.interface";
import { fetchQuizzesByCreator, getSingleQuiz } from "../../../api/quiz.api";
import { type FullQuiz } from "../../types/quiz.interface";

export const useGetQuizzesByCreator = () => {
  return useQuery<QuizItemType[], Error>({
    queryKey: ["quizzes"],
    queryFn: fetchQuizzesByCreator,
  });
};

export const useGetQuiz = (quizId: number) => {
  return useQuery<FullQuiz, Error>({
    queryKey: ["quiz", quizId],
    queryFn: () => getSingleQuiz(quizId),
  });
};
