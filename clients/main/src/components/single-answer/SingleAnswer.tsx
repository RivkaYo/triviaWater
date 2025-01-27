import { IconButton, Stack, TextField } from "@mui/material";
import { type FC } from "react";
import clsx from "clsx";
import {
  FileInput,
  type FilesUploader,
  type UploadedFile,
} from "@hilma/fileshandler-client";
import { v4 as uuidv4 } from "uuid";

import { useI18n } from "../../i18n/i18n-main";

import "./single-answer.scss";

interface SingleAnswerProps {
  index: number;
  value: string;
  image?: string;
  setAnswerValue: (index: number, value: string) => void;
  setAnswerImage: (index: number, image: string) => void;
  setAnswerImageId: (index: number, imageId: number) => void;
  onDeleteAnswer: (index: number) => void;
  isDeleteDisabled: boolean;
  filesUploader: FilesUploader;
}

const SingleAnswer: FC<SingleAnswerProps> = ({
  index,
  value,
  image,
  setAnswerValue,
  setAnswerImage,
  setAnswerImageId,
  onDeleteAnswer,
  isDeleteDisabled,
  filesUploader,
}) => {
  const idUnique = uuidv4();

  const handleFileUpload = (uploadedFile: UploadedFile) => {
    setAnswerImage(index, uploadedFile.link);
    setAnswerImageId(index, uploadedFile.id);
  };
  const i18n = useI18n((i18n) => i18n.singleAnswerText);
  return (
    <Stack direction="row" gap="1.5rem" className="single-answer-container">
      <TextField
        variant="standard"
        dir="rtl"
        className="answer-field"
        value={value}
        placeholder={`${i18n.answer} ${index + 1}`}
        onChange={(e) => {
          setAnswerValue(index, e.target.value);
        }}
      />
      <Stack direction="row-reverse">
        <IconButton
          disabled={isDeleteDisabled}
          className={clsx("icon-buttons", isDeleteDisabled && "disabled")}
          onClick={() => onDeleteAnswer(index)}
        >
          <img src="/icons/trash-icon-darker.svg" className="icons" />
        </IconButton>
        <IconButton
          className="icon-buttons"
          onClick={() => document.getElementById(idUnique)?.click()}
        >
          <img
            src={image ? image : "/icons/image.svg"}
            className={clsx("icons", image && "has-uploaded-answer-image")}
          />
        </IconButton>

        <FileInput
          className="file-input"
          id={idUnique}
          type="image"
          filesUploader={filesUploader}
          onChange={handleFileUpload}
        />
      </Stack>
    </Stack>
  );
};

export default SingleAnswer;
