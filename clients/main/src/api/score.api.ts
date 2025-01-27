import axios from "axios";

import type { Score } from "../common/types/score";

interface ScoreInfo {
  score: number;
  playerName: string;
  quizId: number;
}
export const saveScore = async (scoreInfo: ScoreInfo) => {
  const response = await axios.post("/api/score/save-score", scoreInfo);
  return response.data;
};

export const fetchScores = async (quizId: number): Promise<Score[]> => {
  const response = await axios.get<Score[]>(`/api/score/${quizId}`);
  return response.data;
};
