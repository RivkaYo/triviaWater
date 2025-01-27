import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import clsx from "clsx";

import WhiteCard from "../../components/common/white-card/WhiteCard";
import { useI18n } from "../../i18n/i18n-main";

import "./mobile-home-page.scss";

const MobileHomePage = () => {
  const i18n = useI18n((i18n) => i18n.mobileHomePage);
  const navigate = useNavigate();

  return (
    <div className="mobile-home-page-container">
      <img
        className="banana-leaf"
        src="/images/banana-leaf1.svg"
        alt="a banana leaf"
      />
      <WhiteCard width="90vw" height="95vh">
        <div className="inside-white-card">
          <div className="text-container">
            <p className="game"> {i18n.game} </p>
            <p className="trivia"> {i18n.trivia} </p>
          </div>

          <div className="home-buttons-container">
            <Button
              variant="contained"
              className={clsx(
                "home-page-navigate-buttons",
                "create-quiz-button",
              )}
              onClick={() => void navigate("/login")}
            >
              <img
                className="magic-wand-icon"
                src="/icons/magic-wand.svg"
                alt="magic-wand"
              />
              {i18n.createNewQuiz}
            </Button>
            <Button
              variant="contained"
              className={clsx(
                "home-page-navigate-buttons",
                "my-quizzes-button",
              )}
              onClick={() => void navigate("/quizzes")}
            >
              {i18n.myQuizzes}
            </Button>
          </div>
        </div>
      </WhiteCard>
      <img
        className="home-monkey"
        src="/images/mobile-home-page-monkey.svg"
        alt="cute monkey on banana"
      />
    </div>
  );
};

export default MobileHomePage;
