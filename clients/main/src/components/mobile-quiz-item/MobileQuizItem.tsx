import { useState, type FC } from "react";
import { MoreVertRounded } from "@mui/icons-material";
import { IconButton, MenuItem, MenuList, Paper } from "@mui/material";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { type WebOrMobileQuizItemProps } from "../../common/types/quiz-item-props.interface";
import { useI18n } from "../../i18n/i18n-main";

import "./mobile-quiz-item.scss";

export const MobileQuizItem: FC<
  Omit<WebOrMobileQuizItemProps, "description">
> = ({ id, img, title, numOfQuestions, setPopupType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mobileQuizText = useI18n((i18n) => i18n.mobileQuizText);
  const quizItemText = useI18n((i18n) => i18n.quizItemText);
  const navigate = useNavigate();
  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div className="mobile-quiz-item-container">
        {img ? (
          <img className="quiz-image" src={img} />
        ) : (
          <div className="on-top-of-quiz-image" />
        )}
        <div className="question-number">
          <p className="text">
            {numOfQuestions}
            {quizItemText.questions}
          </p>
        </div>
        <div className="buttons-and-text">
          <IconButton onClick={handleMenuClick}>
            <MoreVertRounded className="menu-button" />
          </IconButton>

          {isMenuOpen && (
            <div className="quiz-menu-container">
              <Paper className="quiz-menu">
                <MenuList>
                  <MenuItem
                    className={clsx("quiz-menu-item", "top-item")}
                    onClick={() => void navigate(`${id}/scoreboard`)}
                  >
                    <img src="/icons/crown-icon.svg" className="image-menu" />
                    <p>{quizItemText.scoreBoard} </p>
                  </MenuItem>
                  <MenuItem className="quiz-menu-item">
                    <img src="/icons/link.svg" className="image-menu" />
                    <p onClick={() => setPopupType("copy")}>
                      {mobileQuizText.sendLinkToTheGame}
                    </p>
                  </MenuItem>
                  <MenuItem className="quiz-menu-item">
                    <img
                      src="/icons/icon-mobile-edit.svg"
                      className="image-menu"
                    />
                    <p> {mobileQuizText.editGame}</p>
                  </MenuItem>
                  <MenuItem className={clsx("quiz-menu-item", "bottom-item")}>
                    <img
                      src="/icons/trash-icon-darker.svg"
                      className="image-menu "
                    />
                    <p onClick={() => setPopupType("delete")}>
                      {mobileQuizText.deleteGame}
                    </p>
                  </MenuItem>
                </MenuList>
              </Paper>
            </div>
          )}

          <p className="quiz-title">{title}</p>
        </div>
      </div>
    </>
  );
};
