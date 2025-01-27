import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  TextField,
} from "@mui/material";
import { useState, type FC } from "react";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import {
  FileInput,
  type FilesUploader,
  type UploadedFile,
} from "@hilma/fileshandler-client";
import clsx from "clsx";

import WhiteCard from "../common/white-card/WhiteCard";
import SingleAnswer from "../single-answer/SingleAnswer";
import { useI18n } from "../../i18n/i18n-main";
import type { QuestionDataInCreation } from "../../common/types/question-data-in-creation.interface.ts";
import type { AnswerInCreation } from "../../common/types/answer-in-creation.interface.ts";

import "./create-question.scss";

interface CreateQuestionProps {
  handleDelete: () => void;
  handleDuplicate: () => void;
  originData: QuestionDataInCreation;
  saveQuestionData: (questionData: QuestionDataInCreation) => void;
  filesUploader: FilesUploader;
}

const CreateQuestion: FC<CreateQuestionProps> = ({
  handleDelete,
  handleDuplicate,
  originData,
  saveQuestionData,
  filesUploader,
}) => {
  const i18n = useI18n((i18n) => i18n.createQuestionText);
  const [nextTempId, setCurrTempId] = useState(3);
  const questionData = originData;

  const titleWidth = `${Math.max(145, Math.min(600, questionData.title.length * 5))}px`;

  const setAnswersAndSaveData = (
    setAnswersFunc: (answers: AnswerInCreation[]) => AnswerInCreation[],
  ) => {
    questionData.answers = setAnswersFunc(questionData.answers);
    saveQuestionData(questionData);
  };

  const setQuestionKey =
    <K extends keyof QuestionDataInCreation>(key: K) =>
    (newValue: QuestionDataInCreation[K]) => {
      questionData[key] = newValue;
      saveQuestionData(questionData);
    };

  const setTitle = setQuestionKey("title");
  const setImage = setQuestionKey("image");
  const setImageId = setQuestionKey("imageId");

  const changeCorrectAnswer = (newCorrect: number) => {
    setAnswersAndSaveData((prev) =>
      produce(prev, (draft: AnswerInCreation[]) => {
        draft.map(
          (answer) => (answer.isCorrect = answer.tempId === newCorrect),
        );
      }),
    );
  };

  const setAnswerImage = (index: number, image: string) => {
    setAnswersAndSaveData((prev) =>
      produce(prev, (draft: AnswerInCreation[]) => {
        draft[index].image = image;
      }),
    );
  };

  const setAnswerImageId = (index: number, imageId: number) => {
    setAnswersAndSaveData((prev) =>
      produce(prev, (draft: AnswerInCreation[]) => {
        draft[index].imageId = imageId;
      }),
    );
  };

  const setAnswerValue = (index: number, value: string) => {
    setAnswersAndSaveData((prev) =>
      produce(prev, (draft: AnswerInCreation[]) => {
        draft[index].value = value;
      }),
    );
  };

  const handleAddAnswer = () => {
    if (questionData.answers.length < 4) {
      const newAnswer = {
        tempId: nextTempId,
        value: ``,
        isCorrect: false,
      };
      setAnswersAndSaveData((prevAnswers) => [...prevAnswers, newAnswer]);
      setCurrTempId((prev) => prev + 1);
    }
  };

  const handleDeleteAnswer = (idToDelete: number, isCorrect: boolean) => {
    if (isCorrect) changeCorrectAnswer(-1);
    setAnswersAndSaveData((prev) =>
      prev.filter((answer) => answer.tempId !== idToDelete),
    );
  };

  const handleFileUpload = (uploadedFile: UploadedFile) => {
    setImage(uploadedFile.link);
    setImageId(uploadedFile.id);
  };

  const idUnique = uuidv4();

  return (
    <div className="create-question-container">
      <WhiteCard width="100%" height="100%">
        {/* Title */}
        <Stack className="white-card-stack">
          <Stack className="title-stack" direction="row">
            <TextField
              dir="rtl"
              className="title-text-field"
              placeholder={i18n.questionWithoutTiTle}
              variant="standard"
              defaultValue={questionData.title}
              onChange={(e) => setTitle(e.target.value)}
              slotProps={{
                input: {
                  disableUnderline: true,
                  style: { width: titleWidth },
                },
              }}
            />
            <Tooltip title={i18n.addImageToQuestion} arrow>
              <div className="image-wrapper">
                <img
                  className={clsx(
                    "uploaded-image",
                    questionData.image && "has-uploaded-image",
                  )}
                  src={
                    questionData.image
                      ? questionData.image
                      : "/icons/image-icon.svg"
                  }
                  alt="Uploaded image preview"
                  onClick={() => document.getElementById(idUnique)?.click()}
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
          </Stack>

          {/* Answers */}
          <Stack dir="rtl">
            <FormControl>
              <RadioGroup
                aria-labelledby="controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
              >
                {questionData.answers.map((answer, index) => (
                  <FormControlLabel
                    key={`answer${answer.tempId}`}
                    value={`answer${index}`}
                    control={
                      <Tooltip title={i18n.markTheRightAnswer} arrow>
                        <Radio
                          checked={answer.isCorrect}
                          onClick={() => changeCorrectAnswer(answer.tempId)}
                          size="small"
                        />
                      </Tooltip>
                    }
                    label={
                      <div className="single-answer">
                        <SingleAnswer
                          filesUploader={filesUploader}
                          index={index}
                          value={answer.value}
                          setAnswerValue={setAnswerValue}
                          setAnswerImage={setAnswerImage}
                          setAnswerImageId={setAnswerImageId}
                          image={answer.image}
                          onDeleteAnswer={() =>
                            handleDeleteAnswer(answer.tempId, answer.isCorrect)
                          }
                          isDeleteDisabled={questionData.answers.length < 3}
                        />
                      </div>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {/* Add answer */}

            <Box className="add-answer-box" dir="ltr">
              <Button
                className="add-answer-btn"
                onClick={handleAddAnswer}
                startIcon={
                  <img
                    className="img-icon"
                    src="/icons/add-icon.svg"
                    alt="add icon"
                  />
                }
                variant="text"
              >
                <p className="add-btn-text">{i18n.addAnswer}</p>
              </Button>
            </Box>
            <Divider sx={{ m: "1rem 0" }} component="div" />
            {/* Delete */}
            <Stack direction="row-reverse">
              <Tooltip title={i18n.delete} arrow>
                <IconButton onClick={handleDelete}>
                  <img
                    src="/icons/trash-icon.svg"
                    alt="delete icon"
                    className="action-btn"
                  />
                </IconButton>
              </Tooltip>

              {/* Duplicate */}
              <Tooltip title={i18n.duplicate} arrow>
                <IconButton onClick={handleDuplicate}>
                  <img
                    src="/icons/duplicate-icon.svg"
                    alt="duplicate icon"
                    className="action-btn"
                  />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
      </WhiteCard>
    </div>
  );
};

export default CreateQuestion;
