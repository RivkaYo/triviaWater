import { type FC } from "react";
import clsx from "clsx";
import { Outlet } from "react-router-dom";

import WhiteCard from "../../components/common/white-card/WhiteCard";
import { useI18n } from "../../i18n/i18n-main";
import "../../components/shared-layout/shared-layout.scss";

const SharedLayout: FC = () => {
  const i18n = useI18n((i18n) => i18n.sharedLayoutText);
  return (
    <WhiteCard>
      <div className="layout-container">
        <div className="all-content-container">
          <div className="content-container">
            <p className={clsx("layout-text", "layout-title")}>
              {i18n.homePageTitle}
            </p>
            <p className={clsx("layout-text", "layout-description")}>
              {i18n.homePageDescription}
            </p>
            <Outlet />
          </div>
          <img
            className="layout-monkey"
            src="/images/shared-layout-monkey.svg"
            alt="cute monkey on banana"
          />
        </div>
      </div>
    </WhiteCard>
  );
};

export default SharedLayout;
