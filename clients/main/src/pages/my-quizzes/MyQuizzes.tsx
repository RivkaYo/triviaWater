import type { FC } from "react";
import { isMobile } from "react-device-detect";
import { withAuth } from "@hilma/auth-client";

import { useI18n } from "../../i18n/i18n-main";
import WhiteCard from "../../components/common/white-card/WhiteCard";
import NoQuizzes from "../../components/no-quizzes/NoQuizzes";
import { Quizzes } from "../../components/my-quizzes/quizzes/Quizzes";
import ProgressBar from "../../components/common/progress-bar/ProgressBar";
import MobileNavbar from "../../components/mobile-navbar/MobileNavbar";
import { useGetQuizzesByCreator } from "../../common/hooks/queries/quiz.queries";

import "./my-quizzes.scss";
// eslint-disable-next-line react-refresh/only-export-components -- component name
const MyQuizzes: FC = () => {
  const i18n = useI18n((i18n) => i18n.myQuiz);
  const { data: quizzesData } = useGetQuizzesByCreator();

  const areThereQuizzes = quizzesData && quizzesData.length > 0;
  return isMobile ? (
    <>
      <MobileNavbar goBackIcon={true} text={i18n.myQuiz} />
      <ProgressBar numQuestions={1} currQuestion={0} />
      {areThereQuizzes ? (
        <Quizzes quizzes={quizzesData || []} />
      ) : (
        <NoQuizzes />
      )}
    </>
  ) : (
    <WhiteCard>
      <h2 className="quizzes-page-title">{`${i18n.myQuiz}:`}</h2>
      {areThereQuizzes ? (
        <Quizzes quizzes={quizzesData || []} />
      ) : (
        <NoQuizzes />
      )}
    </WhiteCard>
  );
};

const wrappedMyQuizzes = withAuth(MyQuizzes, { access: "private" });

export default wrappedMyQuizzes;
