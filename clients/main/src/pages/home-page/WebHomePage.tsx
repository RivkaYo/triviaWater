import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import clsx from "clsx";
import { useAuthData, useLogoutMutation } from "@hilma/auth-client";

import { useI18n } from "../../i18n/i18n-main";

import "./home-page.scss";

const WebHomePage = () => {
  const user = useAuthData();
  const i18n = useI18n((i18n) => i18n.homePageText);
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation("/api/auth/logout");

  const handleLogOut = async () => {
    await logoutMutation.mutateAsync();
    void navigate("/login");
  };

  return (
    <div className="home-page-container">
      <p
        className={clsx("home-text", "hello-user")}
      >{`${i18n.greatUser}${user.username}`}</p>

      <div className="home-buttons-container">
        <Button
          variant="contained"
          className={clsx("home-page-navigate-buttons", "create-quiz-button")}
          onClick={() => void navigate("/edit-quiz")}
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
          className={clsx("home-page-navigate-buttons", "my-quizzes-button")}
          onClick={() => void navigate("/quizzes")}
        >
          {i18n.myQuizzes}
        </Button>
      </div>

      <button className="logout-button" onClick={() => void handleLogOut()}>
        <img src="/icons/logout.svg" alt="logout" />
        <p className="logout-button-text">{i18n.logout}</p>
      </button>
    </div>
  );
};

export default WebHomePage;
