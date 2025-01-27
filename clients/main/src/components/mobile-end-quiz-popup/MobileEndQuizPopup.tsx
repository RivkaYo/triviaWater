import { type FC } from "react";
import { Button, Dialog, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useI18n } from "../../i18n/i18n-main";

import "./mobile-end-quiz-popup.scss";

interface EndQuizWebProps {
  numQuestions: number;
  numCorrectAnswers: number;
  isOpen: boolean;
}

const MobileEndQuizPopup: FC<EndQuizWebProps> = ({
  numCorrectAnswers,
  numQuestions,
  isOpen,
}) => {
  const navigate = useNavigate();
  const i18n = useI18n((i18n) => i18n.mobileEndQuizText);
  const score = Math.floor((numCorrectAnswers / numQuestions) * 100);

  return (
    <Dialog open={isOpen} className="mobile-end-quiz">
      <img
        className="dabbing-monkey"
        src="/images/dabbing-monkey-mobile.svg"
        alt="dabbing monkey"
      />
      <Stack className="end-quiz-stack" gap="2.5rem">
        <Stack className="title-stack" gap="1rem">
          <h1 className="success-sentence">
            {`${i18n.youSucceeded} ${numCorrectAnswers} ${i18n.outOf} ${numQuestions}`}
          </h1>
          <h1 className="score-sentence">{`${i18n.yourScore}:  ${score}`}</h1>
        </Stack>
        <div className="button-container">
          <Button
            className="share-button end-quiz-button"
            variant="contained"
            startIcon={
              <img src="/icons/share-icon.svg" alt="share icon" width="15rem" />
            }
          >
            <p className="button-text">{i18n.shareScore}</p>
          </Button>
          <Button
            onClick={() => void navigate("/home")}
            className="home-page-button end-quiz-button"
            variant="contained"
            startIcon={
              <img src="/icons/house.svg" alt="share icon" width="15rem" />
            }
          >
            <p className="button-text">{i18n.homePage}</p>
          </Button>
        </div>
      </Stack>
    </Dialog>
  );
};

export default MobileEndQuizPopup;
