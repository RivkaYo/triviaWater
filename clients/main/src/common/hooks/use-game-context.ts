import { useContext } from "react";

import { gameContext } from "../contexts/game-context/game-context";

export const useGameContext = () => {
  return useContext(gameContext);
};
