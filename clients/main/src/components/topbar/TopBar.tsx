import clsx from "clsx";

import { useI18n } from "../../i18n/i18n-main";

import "./top-bar.scss";

interface TopBarProps {
  handleSave: () => void;
}

export default function TopBar({ handleSave }: TopBarProps) {
  const i18n = useI18n((i18n) => i18n.topBarText);
  return (
    <div className="top-bar">
      <div className="right-button">
        <button className={clsx("show-quiz", "main-button")}>
          <img
            className="show-quiz-img"
            src="/icons/show-quiz.svg"
            alt="showQuiz"
          />
          {i18n.showQuiz}
        </button>
      </div>
      <div className="left-buttons">
        <button className={clsx("copy-link", "main-button")}>
          <img
            className="img-copy-link"
            src="/icons/copy-link.svg"
            alt="copyLink"
          />
        </button>
        <button
          className={clsx("save-button", "main-button")}
          onClick={handleSave}
        >
          <img className="save-img" src="/icons/diskette.svg" alt="save" />
          {i18n.save}
        </button>
      </div>
    </div>
  );
}
