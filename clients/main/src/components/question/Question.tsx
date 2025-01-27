import { type FC } from "react";

import { useI18n } from "../../i18n/i18n-main";

import "./question.scss";

interface QuestionProps {
  imagePath?: string;
  title: string;
  questionIndex: number;
  numOfQuestions: number;
}
const Question: FC<QuestionProps> = ({
  imagePath,
  title,
  questionIndex,
  numOfQuestions,
}) => {
  const i18n = useI18n((i18n) => i18n.questionText);
  return (
    <div className="question-container">
      <div className="question-index-container">
        <p className="question-index">
          {`${i18n.question} ${questionIndex}/${numOfQuestions}`}
        </p>
      </div>
      {imagePath && <img className="question-image" src={`/api${imagePath}`} />}

      <h1 className="question-title">{title}</h1>
    </div>
  );
};

export default Question;
