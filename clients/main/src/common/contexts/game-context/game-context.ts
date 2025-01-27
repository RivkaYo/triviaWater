import { type Dispatch, type SetStateAction } from "react";
import { createContext } from "react";

interface GameContextType {
  pageNumber: number;
  handleIncrementPageNumber: () => void;
  numCorrectAnswers: number;
  incrementCorrectAnswers: () => void;
  currentQuestionNumber: number;
  increaseNumOfQuestion: () => void;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
}

const defaultContextValue: GameContextType = {
  pageNumber: -1,
  handleIncrementPageNumber: () => {
    // Placeholder function that does nothing
  },
  numCorrectAnswers: 0,
  incrementCorrectAnswers: () => {
    // Placeholder function that does nothing
  },

  currentQuestionNumber: 1,
  increaseNumOfQuestion: () => {
    // Placeholder function that does nothing
  },
  userName: "",
  setUserName: () => {
    // Placeholder function that does nothing
  },
};

export const gameContext = createContext<GameContextType>(defaultContextValue);
