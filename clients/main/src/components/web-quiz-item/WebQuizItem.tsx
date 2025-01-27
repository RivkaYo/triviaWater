import { type FC } from "react";
import { useNavigate } from "react-router-dom";

import { useI18n } from "../../i18n/i18n-main";

import edit from "/icons/icon-edit.svg";
import trash from "/icons/trash-icon-darker.svg";
import link from "/icons/link.svg";

import { type WebOrMobileQuizItemProps } from "../../common/types/quiz-item-props.interface";

import "./web-quiz-item.scss";

const WebQuizItem: FC<WebOrMobileQuizItemProps> = ({
  id,
  img,
  title,
  description,
  numOfQuestions,
  setPopupType,
}) => {
  const navigate = useNavigate();
  const i18n = useI18n((i18n) => i18n.quizItemText);
  return (
    <>
      <div className="quiz-item-container">
        <div className="image-container">
          <img className="quiz-image" src={img} />
          <div className="question-number">
            <p className="text">
              {numOfQuestions} {i18n.questions}
            </p>
          </div>
        </div>
        <div className="buttons-and-text">
          <div className="body">
            <p className="title">{title}</p>
            <p className="subtitle">{description}</p>
          </div>
          <div className="all-buttons">
            <button
              className="button-for-result"
              onClick={() => void navigate(`${id}/scoreboard`)}
            >
              {i18n.scoreBoard}
            </button>

            <div className="buttons-container">
              <button className="control-button">
                <img className="control-img" src={edit} />
              </button>
              <button
                className="control-button"
                onClick={() => {
                  setPopupType("delete");
                }}
              >
                <img className="control-img" src={trash} />
              </button>
              <button
                className="control-button"
                onClick={() => {
                  setPopupType("copy");
                }}
              >
                <img className="control-img" src={link} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebQuizItem;
