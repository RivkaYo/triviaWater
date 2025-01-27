import { useQuery } from "@tanstack/react-query";

import type { Score } from "../../types/score";
import { fetchScores } from "../../../api/score.api";

export const useGetScore = (quizId: number) => {
  return useQuery<Score[], Error>({
    queryKey: ["score", quizId],
    queryFn: () => fetchScores(quizId),
  });
};
