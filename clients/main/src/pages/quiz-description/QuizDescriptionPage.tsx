import type { FC } from "react";
import { isMobile } from "react-device-detect";

import MobileNavbar from "../../components/mobile-navbar/MobileNavbar";
import ProgressBar from "../../components/common/progress-bar/ProgressBar";
import QuizDescription from "../../components/quiz-description/QuizDescription";
import { useI18n } from "../../i18n/i18n-main";

interface QuizDescriptionPageProps {
  img?: string;
  title: string;
  description: string;
}

const QuizDescriptionPage: FC<QuizDescriptionPageProps> = ({
  img,
  title,
  description,
}) => {
  const i18n = useI18n((i18n) => i18n.navbarText);
  return isMobile ? (
    <>
      <MobileNavbar bananaIcon={true} text={i18n.siteName} />
      <ProgressBar currQuestion={0} numQuestions={1} />
      <QuizDescription img={img} title={title} description={description} />
    </>
  ) : (
    <QuizDescription img={img} title={title} description={description} />
  );
};

export default QuizDescriptionPage;
