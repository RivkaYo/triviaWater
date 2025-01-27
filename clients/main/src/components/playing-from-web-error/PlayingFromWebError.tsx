import { useI18n } from "../../i18n/i18n-main";

import "./playing-from-web-error.scss";

const PlayingFromWebError = () => {
  const i18n = useI18n((i18n) => i18n.playingFromWebErrorText);
  return (
    <div className="playing-from-web-page-container">
      <h1 className="error-text">{i18n.playingFromWebError}</h1>
    </div>
  );
};

export default PlayingFromWebError;
