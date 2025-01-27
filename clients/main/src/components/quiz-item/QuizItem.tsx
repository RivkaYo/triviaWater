import { useState, type FC } from "react";
import { isMobile } from "react-device-detect";
import { useAlert } from "@hilma/forms";
import { useQueryClient } from "@tanstack/react-query";

import { useDeleteQuizMutation } from "../../common/hooks/mutations/quiz.mutations";
import WebQuizItem from "../web-quiz-item/WebQuizItem";
import { MobileQuizItem } from "../mobile-quiz-item/MobileQuizItem";
import GenericPopUp from "../generic-pop-up/GenericPopUp";
import { type QuizItemProps } from "../../common/types/quiz-item-props.interface";

export const QuizItem: FC<QuizItemProps> = ({
  id,
  img,
  title,
  description,
  numOfQuestions,
}) => {
  const [popupType, setPopupType] = useState<"copy" | "delete" | null>(null);
  const queryClient = useQueryClient();
  const showAlert = useAlert();

  const mutation = useDeleteQuizMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: (error) => {
      const errorData = error.response?.data as {
        error: string;
        message: string;
        statusCode: number;
      };
      showAlert(errorData.message, "error");
    },
  });

  function onDeleteQuiz(id: number): void {
    mutation.mutate(id);
  }

  const copyContent = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error.message, "error");
      } else {
        showAlert("An unknown error occurred:", "error");
      }
    }
  };

  function onCopyQuiz(id: number): void {
    const text = `${window.location.href}/${id}`;
    void copyContent(text);
  }

  const onPopUpApprove = () => {
    if (popupType === "delete") {
      onDeleteQuiz(id);
    } else if (popupType === "copy") {
      onCopyQuiz(id);
    }
    onPopUpClose();
  };
  const onPopUpClose = () => {
    setPopupType(null);
  };
  return (
    <>
      {!isMobile ? (
        <div className="single-quiz">
          <WebQuizItem
            id={id}
            img={img || ""}
            title={title}
            numOfQuestions={numOfQuestions}
            description={description}
            setPopupType={setPopupType}
          />
        </div>
      ) : (
        <div className="mobile-single-quiz">
          <MobileQuizItem
            id={id}
            img={img || ""}
            title={title}
            numOfQuestions={numOfQuestions}
            setPopupType={setPopupType}
          />
        </div>
      )}
      {popupType === "delete" && (
        <GenericPopUp
          type="delete"
          handleApprove={onPopUpApprove}
          handleReject={onPopUpClose}
          isOpen={popupType === "delete" ? true : false}
        />
      )}
      {popupType === "copy" && (
        <GenericPopUp
          type="copy"
          handleApprove={onPopUpApprove}
          handleReject={onPopUpClose}
          isOpen={popupType === "copy" ? true : false}
        />
      )}
    </>
  );
};
