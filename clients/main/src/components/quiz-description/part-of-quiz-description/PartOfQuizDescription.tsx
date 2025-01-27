import { type FC } from "react";

import arrow from "/icons/play.svg";

import { useI18n } from "../../../i18n/i18n-main";
import colors from "../../../style/colors";
import "../quiz-description.scss";

interface PartOfQuizDescriptionProps {
  onIncrementPageNumber: () => void;
  img?: string;
  title: string;
  description: string;
}

const PartOfQuizDescription: FC<PartOfQuizDescriptionProps> = ({
  onIncrementPageNumber: handleIncrementPageNumber,
  img,
  title,
  description,
}) => {
  const i18n = useI18n((i18n) => i18n.quizDescription);
  return (
    <div className="quiz-description-container">
      <div className="description">
        <p className="title">{title}</p>
        <p className="description">{description}</p>
      </div>
      <div
        className="img-container"
        style={{
          backgroundImage: img ? `url(${img})` : "none",
          backgroundColor: img ? "transparent" : colors.gray,
        }}
      >
        <button
          className="start-game-button"
          onClick={handleIncrementPageNumber}
        >
          <p className="button-text">{i18n.startPlay}</p>
          <img className="arrow-img" src={arrow} alt="Start" />
        </button>
      </div>
    </div>
  );
};
export default PartOfQuizDescription;
