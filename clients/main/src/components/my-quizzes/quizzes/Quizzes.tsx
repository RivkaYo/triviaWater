import { type FC } from "react";

import { type QuizItemType } from "../../../common/types/quiz-item.interface";
import { QuizItem } from "../../quiz-item/QuizItem";

import "./quizzes.scss";

interface QuizzesProps {
  quizzes: QuizItemType[];
}
export const Quizzes: FC<QuizzesProps> = ({ quizzes }) => {
  return (
    <div className="quizzes">
      {quizzes?.map((quiz) => (
        <QuizItem
          key={quiz.id}
          id={quiz.id}
          img={quiz.imagePath ? `/api${quiz.imagePath}` : ""}
          title={quiz.title}
          description={quiz.description}
          numOfQuestions={quiz.numOfQuestions}
        />
      ))}
    </div>
  );
};
