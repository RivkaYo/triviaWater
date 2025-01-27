import {
  type Dispatch,
  type FC,
  type SetStateAction,
  type ChangeEvent,
} from "react";
import { Tooltip } from "@mui/material";
import clsx from "clsx";
import {
  FileInput,
  type FilesUploader,
  type UploadedFile,
} from "@hilma/fileshandler-client";
import { v4 as uuidv4 } from "uuid";

import WhiteCard from "../common/white-card/WhiteCard";
import { useI18n } from "../../i18n/i18n-main";

import "./quiz-title.scss";

interface QuizTitleProps {
  handleChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeDescription: (event: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  description: string;
  filesUploader: FilesUploader;
  setQuizTitleImage: Dispatch<SetStateAction<string | null>>;
  setQuizImageId: Dispatch<SetStateAction<number | null>>;
  quizTitleImage?: string;
}

const QuizTitle: FC<QuizTitleProps> = ({
  handleChangeTitle,
  handleChangeDescription,
  title,
  description,
  filesUploader,
  setQuizTitleImage,
  quizTitleImage,
  setQuizImageId,
}) => {
  const i18n = useI18n((i18n) => i18n.quizTitleText);
  const titleWidth = `${Math.max(Math.min(600, title.length * 23))}px`;
  const descriptionWidth = `${Math.max(150, Math.min(600, 25 + description.length * 10))}px`;
  const idUnique = uuidv4();

  const handleFileUpload = (uploadedFile: UploadedFile) => {
    setQuizTitleImage(uploadedFile.link);
    setQuizImageId(uploadedFile.id);
  };

  return (
    <div className="quiz-title-container">
      <WhiteCard width="100%" height="12rem">
        <div className="quiz-img-container">
          <Tooltip
            title={i18n.addImageToTheQuiz}
            arrow
            className="tooltip"
            slotProps={{
              popper: {
                className: "tooltip-content",
              },
            }}
          >
            <div
              className={`image-wrapper ${quizTitleImage ? "has-quiz-image" : ""}`}
              onClick={() => document.getElementById(idUnique)?.click()}
            >
              <img
                className={clsx(
                  "quiz-image",
                  quizTitleImage && "has-uploaded-title-image",
                )}
                src={quizTitleImage ? quizTitleImage : "/icons/image.svg"}
                alt="quiz"
              />
              <FileInput
                className="file-input"
                id={idUnique}
                type="image"
                filesUploader={filesUploader}
                onChange={handleFileUpload}
              />
            </div>
          </Tooltip>
        </div>

        <div className="quiz-fields-container">
          <Tooltip
            title={i18n.changingName}
            arrow
            className="tooltip"
            slotProps={{
              popper: {
                className: "tooltip-content",
              },
            }}
          >
            <input
              placeholder={i18n.quizWithoutTitle}
              className={clsx("title-field", "quiz-field")}
              onChange={handleChangeTitle}
              style={{ width: titleWidth }}
            />
          </Tooltip>
          <Tooltip
            title={i18n.changingName}
            arrow
            className="tooltip"
            slotProps={{
              popper: {
                className: "tooltip-content",
              },
            }}
          >
            <input
              placeholder={i18n.quizDescription}
              className={clsx("description-field", "quiz-field")}
              onChange={handleChangeDescription}
              style={{ width: descriptionWidth }}
            />
          </Tooltip>
        </div>
      </WhiteCard>
    </div>
  );
};
export default QuizTitle;
