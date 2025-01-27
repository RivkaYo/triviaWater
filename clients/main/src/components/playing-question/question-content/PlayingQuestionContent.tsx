import { Divider, Stack } from "@mui/material";
import { useEffect, useState, type FC } from "react";
import clsx from "clsx";

import ProgressBar from "../../common/progress-bar/ProgressBar";
import Question from "../../question/Question";
import Answer from "../../answer/Answer";
import type { CurrentQuestion } from "../../../common/types/playing-question.interface";
import { useGameContext } from "../../../common/hooks/use-game-context";

import "./playing-question-content.scss";

interface PlayingQuestionContentProps {
  currentQuestion: CurrentQuestion;
  numOfQuestions: number;
  hasImage: boolean;
}

const PlayingQuestionContent: FC<PlayingQuestionContentProps> = ({
  currentQuestion,
  numOfQuestions,
  hasImage,
}) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);

  const {
    incrementCorrectAnswers,
    increaseNumOfQuestion,
    currentQuestionNumber,
    handleIncrementPageNumber,
  } = useGameContext();
  useEffect(() => {
    setSelectedAnswerId(null);
  }, [currentQuestionNumber]);

  const handleAnswerClick = (id: number, isCorrect: boolean): void => {
    setSelectedAnswerId(id);
    setTimeout(() => {
      if (numOfQuestions === currentQuestionNumber) {
        handleIncrementPageNumber();
      } else {
        increaseNumOfQuestion();
      }
    }, 2000);

    if (isCorrect) {
      incrementCorrectAnswers();
    }
  };

  return (
    <div className={clsx("all-question-content", hasImage && "has-image")}>
      <ProgressBar
        numQuestions={numOfQuestions}
        currQuestion={currentQuestion.index}
      />
      <Stack className="title-and-answers-stack" dir="ltr">
        <Question
          imagePath={currentQuestion.imagePath}
          title={currentQuestion.title}
          questionIndex={currentQuestion.index}
          numOfQuestions={numOfQuestions}
        />
        <Divider className="divider" component="div" />
        <Stack className="answers-stack">
          {currentQuestion.answers.map((answer) => (
            <div
              className="single-answer"
              key={answer.id}
              onClick={() => handleAnswerClick(answer.id, answer.isCorrect)}
            >
              <Answer
                content={answer.answerText}
                className={
                  selectedAnswerId !== null && answer.isCorrect
                    ? "right-choice"
                    : selectedAnswerId === answer.id
                      ? "wrong-choice"
                      : undefined
                }
                imagePath={answer.imagePath}
              />
            </div>
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default PlayingQuestionContent;
