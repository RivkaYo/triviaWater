import { type ReactNode, useState, type FC } from "react";

import { gameContext } from "./game-context";

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: FC<GameProviderProps> = ({ children }) => {
  const [pageNumber, setPageNumber] = useState<number>(-1);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState<number>(0);
  const [currentQuestionNumber, setCurrentQuestion] = useState<number>(1);
  const [userName, setUserName] = useState<string>("");
  const handleIncrementPageNumber = () =>
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  const incrementCorrectAnswers = () =>
    setNumCorrectAnswers((prevNumOfAnswers) => prevNumOfAnswers + 1);
  const increaseNumOfQuestion = () =>
    setCurrentQuestion((prevNumber) => prevNumber + 1);

  return (
    <gameContext.Provider
      value={{
        pageNumber,
        handleIncrementPageNumber,
        numCorrectAnswers,
        incrementCorrectAnswers,
        currentQuestionNumber,
        increaseNumOfQuestion,
        userName,
        setUserName,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};
