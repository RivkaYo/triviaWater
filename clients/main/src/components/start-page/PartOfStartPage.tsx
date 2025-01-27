import { type FC } from "react";

import arrow from "/icons/play.svg";

import { useI18n } from "../../i18n/i18n-main";
import { useGameContext } from "../../common/hooks/use-game-context";

import "./start-page.scss";

interface PartOfStartPageProps {
  title?: string;
}

const PartOfStartPage: FC<PartOfStartPageProps> = ({ title }) => {
  const i18n = useI18n((i18n) => i18n.startPage);
  const { handleIncrementPageNumber, userName, setUserName } = useGameContext();

  return (
    <div className="start-game">
      {title && <p className="title">{title}</p>}
      <p className="what-your-name"> {i18n.whatYourName} </p>
      <input
        value={userName}
        className="enter-your-name"
        placeholder={i18n.enterYourName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button
        className="start-game-button"
        disabled={userName.length === 0}
        onClick={handleIncrementPageNumber}
      >
        <p className="button-text"> {i18n.letsStart} </p>
        <img className="arrow-img" src={arrow} />
      </button>
    </div>
  );
};

export default PartOfStartPage;
