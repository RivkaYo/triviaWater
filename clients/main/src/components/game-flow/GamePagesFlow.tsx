import { provide } from "@hilma/tools";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";

import { useGameContext } from "../../common/hooks/use-game-context";
import QuizDescription from "../quiz-description/QuizDescription";
import StartPage from "../start-page/StartPage";
import EndQuizWeb from "../end-quiz/EndQuizWeb";
import PlayingQuestion from "../playing-question/PlayingQuestion";
import { useGetQuiz } from "../../common/hooks/queries/quiz.queries";
import { PageState } from "../../common/types/page-state.enum";
import { GameProvider } from "../../common/contexts/game-context/GameContextProvider";
import PlayingFromWebError from "../playing-from-web-error/PlayingFromWebError";
import MobileEndQuizPopup from "../mobile-end-quiz-popup/MobileEndQuizPopup";
import { useSaveScore } from "../../common/hooks/mutations/score.mutations";

export const GamePage = () => {
  const { pageNumber, numCorrectAnswers, currentQuestionNumber, userName } =
    useGameContext();
  const { quizId } = useParams();
  const parsedQuizId = quizId ? parseInt(quizId) : undefined;
  const { data: quizData } = useGetQuiz(parsedQuizId || 0);
  const currentQuestion = quizData?.questions[currentQuestionNumber - 1];
  const { mutate: saveScore } = useSaveScore();

  const handleSaveScore = () => {
    const scoreInfo = {
      score: Math.floor(
        (numCorrectAnswers / (quizData?.questions.length || 0)) * 100,
      ),
      playerName: userName,
      quizId: parsedQuizId || 0,
    };

    saveScore(scoreInfo);
  };

  useEffect(() => {
    if (pageNumber === PageState.EndQuiz) {
      handleSaveScore();
    }
  }, [pageNumber]);

  const renderPage = (page: number) => {
    switch (page) {
      case PageState.QuizDescription:
        return (
          <QuizDescription
            description={quizData?.description || ""}
            title={quizData?.title || ""}
            img={quizData?.imagePath ?? undefined}
          />
        );
      case PageState.StartPage:
        return <StartPage title={quizData?.title || ""} />;
      case PageState.PlayingQuestion:
        return (
          <PlayingQuestion
            numOfQuestions={quizData?.questions.length || 0}
            currentQuestion={currentQuestion}
          />
        );
      case PageState.EndQuiz:
        return isMobile ? (
          <>
            <PlayingQuestion
              numOfQuestions={quizData?.questions.length || 0}
              currentQuestion={currentQuestion}
            />
            <MobileEndQuizPopup
              numQuestions={quizData?.questions.length || 0}
              numCorrectAnswers={numCorrectAnswers}
              isOpen={true}
            />
          </>
        ) : (
          <EndQuizWeb
            numCorrectAnswers={numCorrectAnswers}
            numQuestions={quizData?.questions.length || 0}
          />
        );
    }
  };

  return isMobile ? renderPage(pageNumber) : <PlayingFromWebError />;
};

// @ts-ignore -- no props to GameProvider context
const GameWithProvider = provide([GameProvider])(GamePage);
export default GameWithProvider;
