import { type FC } from "react";
import clsx from "clsx";

import "./answer.scss";

interface AnswerProps {
  content: string;
  className?: string;
  imagePath?: string;
}

const Answer: FC<AnswerProps> = ({ content, className, imagePath }) => {
  return (
    <button className={clsx("answer", className && className)}>
      <div className="answer-text">{content}</div>
      {imagePath && (
        <div className="answer-image">
          <img
            src={`/api${imagePath}`}
            alt="An image for this answer"
            className="answer-img-direct"
          />
        </div>
      )}
    </button>
  );
};
export default Answer;
