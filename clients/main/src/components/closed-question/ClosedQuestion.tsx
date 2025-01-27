import { type FC } from "react";

import WhiteCard from "../common/white-card/WhiteCard";
import type { QuestionDataInCreation } from "../../common/types/question-data-in-creation.interface";

import "./closed-question.scss";

interface ClosedQuestionProps {
  questionData: QuestionDataInCreation;
}

const ClosedQuestion: FC<ClosedQuestionProps> = ({
  questionData: { title, image, answers },
}) => {
  return (
    <WhiteCard height="auto" width="100%">
      <div className="closed-question">
        <div className="closed-question-title">
          <h2 className="title">{title}</h2>
          {image && (
            <img src={image} alt="title" className="closed-question-image" />
          )}
        </div>
        <div className="closed-question-answers">
          {answers.map((answer, index) => (
            <div className="closed-question-answer" key={`answer${index}`}>
              <div className="custom-radio">
                {answer.isCorrect && (
                  <img
                    className="radio-button-image"
                    src="/icons/icon-feather-check.svg"
                    alt="checkmark"
                  />
                )}
              </div>
              <label className="answer-content">{answer.value}</label>
              {answer.image && (
                <img
                  src={answer.image}
                  alt={`Answer ${index}`}
                  className="closed-question-answer-image"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </WhiteCard>
  );
};

export default ClosedQuestion;
