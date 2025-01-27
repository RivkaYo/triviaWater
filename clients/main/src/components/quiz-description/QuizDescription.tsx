import { isMobile } from "react-device-detect";
import { type FC } from "react";

import MobileNavbar from "../mobile-navbar/MobileNavbar";
import WhiteCard from "../common/white-card/WhiteCard";
import { useGameContext } from "../../common/hooks/use-game-context";

import PartOfQuizDescription from "./part-of-quiz-description/PartOfQuizDescription";

import "./quiz-description.scss";

interface QuizDescriptionProps {
  img?: string;
  title: string;
  description: string;
}

const QuizDescription: FC<QuizDescriptionProps> = ({
  img,
  title,
  description,
}) => {
  const { handleIncrementPageNumber } = useGameContext();

  return !isMobile ? (
    <WhiteCard>
      <PartOfQuizDescription
        onIncrementPageNumber={handleIncrementPageNumber}
        img={`/api${img}`}
        title={title}
        description={description}
      />
    </WhiteCard>
  ) : (
    <>
      <MobileNavbar text="BANANAS.Games" bananaIcon={true} />
      <PartOfQuizDescription
        onIncrementPageNumber={handleIncrementPageNumber}
        img={`/api${img}`}
        title={title}
        description={description}
      />
    </>
  );
};

export default QuizDescription;
