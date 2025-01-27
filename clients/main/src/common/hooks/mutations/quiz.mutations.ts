import { useMutation } from "@tanstack/react-query";

import { createQuiz, deleteQuiz } from "../../../api/quiz.api";
import type { MutationsProps } from "../../types/mutation-props.interface";

export const useDeleteQuizMutation = ({
  onError,
  onSuccess,
}: MutationsProps) => {
  return useMutation({
    mutationFn: deleteQuiz,
    onError,
    onSuccess,
  });
};

export const useCreateQuizMutation = ({
  onError,
  onSuccess,
}: MutationsProps) => {
  return useMutation({
    mutationFn: createQuiz,
    onError,
    onSuccess,
  });
};
