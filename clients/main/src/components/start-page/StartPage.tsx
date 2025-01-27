import { isMobile } from "react-device-detect";
import { type FC } from "react";

import WhiteCard from "../common/white-card/WhiteCard";
import MobileNavbar from "../mobile-navbar/MobileNavbar";
import ProgressBar from "../common/progress-bar/ProgressBar";

import PartOfStartPage from "./PartOfStartPage";

interface StartPageProps {
  title: string;
}

const StartPage: FC<StartPageProps> = ({ title }) => {
  return (
    <>
      {!isMobile ? (
        <WhiteCard>
          <PartOfStartPage title={title} />
        </WhiteCard>
      ) : (
        <>
          <MobileNavbar text={title} goBackIcon={true} />
          <ProgressBar currQuestion={0} numQuestions={1} />
          <PartOfStartPage />
        </>
      )}
    </>
  );
};

export default StartPage;
