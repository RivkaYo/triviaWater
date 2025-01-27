import type { FC } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import WhiteCard from "../common/white-card/WhiteCard";
import { type QuestionForQuiz } from "../../common/types/question.interface";
import { type Answer } from "../../common/types/answer.interface";

import QuestionContent from "./question-content/PlayingQuestionContent";

import "./playing-question.scss";

interface PlayingQuestionProps {
  numOfQuestions: number;
  currentQuestion: QuestionForQuiz | undefined;
}

const PlayingQuestion: FC<PlayingQuestionProps> = ({
  numOfQuestions,
  currentQuestion,
}) => {
  const hasImage = currentQuestion?.answers.some(
    (answer: Answer) => answer.imagePath,
  );
  return (
    <div className="all-playing-question">
      {currentQuestion && (
        <>
          <BrowserView>
            <WhiteCard>
              <QuestionContent
                numOfQuestions={numOfQuestions}
                currentQuestion={currentQuestion}
                hasImage={hasImage || false}
              />
            </WhiteCard>
          </BrowserView>
          <MobileView>
            <QuestionContent
              numOfQuestions={numOfQuestions}
              currentQuestion={currentQuestion}
              hasImage={hasImage || false}
            />
          </MobileView>
        </>
      )}
    </div>
  );
};

export default PlayingQuestion;
