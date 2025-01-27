import { useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useEffect, type FC } from "react";

import { useI18n } from "../../i18n/i18n-main";
import ProgressBar from "../common/progress-bar/ProgressBar";
import WhiteCard from "../common/white-card/WhiteCard";
import { useSaveScore } from "../../common/hooks/mutations/score.mutations";
import { useGameContext } from "../../common/hooks/use-game-context";

import "./end-quiz-web.scss";

interface EndQuizWebProps {
  numQuestions: number;
  numCorrectAnswers: number;
}
const EndQuizWeb: FC<EndQuizWebProps> = ({
  numQuestions,
  numCorrectAnswers,
}) => {
  const i18n = useI18n((i18n) => i18n.endQuizWeb);
  const score = Math.floor((numCorrectAnswers / numQuestions) * 100);
  const { userName } = useGameContext();
  const { quizId } = useParams();
  const parsedQuizId = quizId ? parseInt(quizId) : undefined;
  const { mutate: saveScore } = useSaveScore();
  const handleSaveScore = () => {
    const scoreInfo = {
      score,
      playerName: userName,
      quizId: parsedQuizId || 0,
    };

    saveScore(scoreInfo);
  };
  useEffect(() => {
    handleSaveScore();
  }, []);

  return (
    <WhiteCard>
      <ProgressBar
        numQuestions={numQuestions}
        currQuestion={numQuestions}
        isEnd
      />

      <div className="end-quiz-stack-container">
        <Stack className="end-quiz-stack" gap="2rem">
          <img
            className="dabbing-monkey"
            src="/images/dabbing-monkey.svg"
            alt="dabbing monkey"
          />
          <h1 className="score-sentence">
            {`${i18n.youAnsweredCorrectly} ${numCorrectAnswers} ${i18n.questions}
              ${i18n.yourGradeIs}  ${score}`}
          </h1>
          <p className="share-sentence">{i18n.shareYourResult}</p>
          <Button
            className="share-button"
            variant="contained"
            endIcon={
              <img src="/icons/share-icon.svg" alt="share icon" width="15rem" />
            }
          >
            {i18n.shareResult}
          </Button>
        </Stack>
      </div>
    </WhiteCard>
  );
};

export default EndQuizWeb;
