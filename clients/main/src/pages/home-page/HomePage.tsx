import { isMobile } from "react-device-detect";
import { withAuth } from "@hilma/auth-client";

import WebHomePage from "./WebHomePage";
import MobileHomePage from "./MobileHomePage";

// eslint-disable-next-line react-refresh/only-export-components -- component name
const HomePage = () => {
  return isMobile ? <MobileHomePage /> : <WebHomePage />;
};

const wrappedHomePage = withAuth(HomePage, { access: "private" });

export default wrappedHomePage;
