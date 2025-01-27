import { withAuth } from "@hilma/auth-client";

import { useI18n } from "../../i18n/i18n-main";

import "./not-found-page.scss";

// eslint-disable-next-line react-refresh/only-export-components -- component name
const NotFoundPage = () => {
  const i18n = useI18n((i18n) => i18n.pageNotFound);
  return (
    <div className="not-found-page-container">
      <div className="not-found-page-status">
        <h1 className="four">4</h1>
        <img src="/images/thinking-monkey.svg" />
        <h1 className="four">4</h1>
      </div>
      <h2 className="not-found-page-text">{i18n.pageDoesNotExist}</h2>
    </div>
  );
};

const wrappedNotFoundPage = withAuth(NotFoundPage, { access: "private" });
export default wrappedNotFoundPage;
