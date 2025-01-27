import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { useI18n } from "../../i18n/i18n-main";

import "./no-quizzes.scss";

export default function NoQuizzes() {
  const i18n = useI18n((i18n) => i18n.noQuiz);
  const navigate = useNavigate();

  return (
    <div className="no-quizzes-page-container">
      <img className="image-center" src="/images/thinking-monkey.svg" />
      <div className="below-image-container">
        <h1 className="question">{i18n.noQuizzes}</h1>
        <Button
          className="create-button"
          onClick={() => void navigate("/edit-quiz")}
        >
          {i18n.createQuiz}
        </Button>
      </div>
    </div>
  );
}
