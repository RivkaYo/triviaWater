import type { FC } from "react";
import { Divider } from "@mui/material";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";

import { useI18n } from "../../i18n/i18n-main";

import "./nav-bar.scss";

const NavBar: FC = () => {
  const i18n = useI18n((i18n) => i18n.navbarText);
  const currentLocation = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (route: string) => void navigate(route);

  return (
    <nav className="nav-bar">
      <div className="navbar-buttons-container">
        <button
          className={clsx("nav-bar-button", "create-quiz-button")}
          onClick={() => handleNavigation("/edit-quiz")}
          disabled={currentLocation.pathname === "/edit-quiz"}
        >
          {i18n.createQuiz}
        </button>
        <div className="navbar-links-container">
          <Divider orientation="vertical" flexItem className="nav-divider" />
          <button
            className={clsx("nav-bar-button", "link-button")}
            onClick={() => handleNavigation("/quizzes")}
            disabled={currentLocation.pathname === "/quizzes"}
          >
            {i18n.myQuizzes}
          </button>
          <Divider orientation="vertical" flexItem className="nav-divider" />
          <button
            className={clsx("nav-bar-button", "link-button")}
            onClick={() => handleNavigation("/about")}
            disabled={currentLocation.pathname === "/about"}
          >
            {i18n.about}
          </button>
          <Divider orientation="vertical" flexItem className="nav-divider" />
          <button
            className={clsx("nav-bar-button", "link-button")}
            onClick={() => handleNavigation("/change-password")}
            disabled={currentLocation.pathname === "/change-password"}
          >
            {i18n.changePassword}
          </button>
        </div>
      </div>

      <div className="navbar-logo">
        <button
          className={clsx("nav-bar-button", "home-button")}
          onClick={() => handleNavigation("/home")}
          disabled={currentLocation.pathname === "/home"}
        >
          {i18n.siteName}
        </button>
        <img className="logo" src="/icons/banana.svg" alt="Banana peal icon" />
      </div>
    </nav>
  );
};

export default NavBar;
