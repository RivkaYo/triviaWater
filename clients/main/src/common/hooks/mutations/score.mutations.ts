import { useMutation } from "@tanstack/react-query";

import { saveScore } from "../../../api/score.api";

export const useSaveScore = () => {
  return useMutation({
    mutationFn: saveScore,
  });
};
