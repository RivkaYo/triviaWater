import { useEffect, useState, type FC } from "react";
import { withAuth } from "@hilma/auth-client";
import { useFiles } from "@hilma/fileshandler-client";
import { useAlert } from "@hilma/forms";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useCreateQuizMutation } from "../../common/hooks/mutations/quiz.mutations";
import TopBar from "../../components/topbar/TopBar";
import QuizTitle from "../../components/quiz-title/QuizTitle";
import CreateQuestion from "../../components/create-question/CreateQuestion";
import ClosedQuestion from "../../components/closed-question/ClosedQuestion";
import type { QuestionInCreation } from "../../common/types/question-in-creation.interface";
import type { QuestionDataInCreation } from "../../common/types/question-data-in-creation.interface";
import { useI18n } from "../../i18n/i18n-main";
import type { NewQuiz } from "../../common/types/quiz.interface";
import LoadingMonkey from "../../components/loading-monkey/LoadingMonkey";

import "./create-quiz-page.scss";

// eslint-disable-next-line react-refresh/only-export-components -- component name
const CreateQuizPage: FC = () => {
  const navigate = useNavigate();
  const i18n = useI18n((i18n) => i18n.createQuizPage);
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  const [nextTempId, setCurrTempId] = useState(1);

  const showAlert = useAlert();

  const makeDefaultQuestion = (): QuestionDataInCreation => {
    return {
      title: "",
      answers: [
        { tempId: 1, value: "", isCorrect: false },
        { tempId: 2, value: "", isCorrect: false },
      ],
    };
  };

  const makeNewQuestionInCreation = (
    questionData: QuestionDataInCreation = makeDefaultQuestion(),
  ): QuestionInCreation => {
    const newQuestionId = nextTempId;
    setOpenedQuestionId(nextTempId);
    setCurrTempId((prev) => prev + 1);

    return {
      tempId: newQuestionId,
      questionData: JSON.parse(JSON.stringify(questionData)),
    };
  };

  const [openedQuestionId, setOpenedQuestionId] = useState(0);
  const [quizTitleImage, setQuizTitleImage] = useState<string | null>(null);
  const [quizImageId, setQuizImageId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<QuestionInCreation[]>([
    { tempId: 0, questionData: makeDefaultQuestion() },
  ]);
  const [currQuestion, setCurrQuestion] = useState<QuestionDataInCreation>(
    makeDefaultQuestion(),
  );

  const addQuestion = (
    questionData: QuestionDataInCreation = makeDefaultQuestion(),
    i: number = questions.length,
  ) => {
    const newQuestion = makeNewQuestionInCreation(questionData);
    setQuestions((prev) => prev.toSpliced(i, 0, newQuestion));
    setCurrQuestion(newQuestion.questionData);
    handleChangeOpened(newQuestion, true);
  };

  const handleDelete = (questionIndex: number) => {
    const questionId = questions[questionIndex].tempId;
    handleChangeOpened(
      questions[questionIndex > 0 ? questionIndex - 1 : 1],
      false,
    );
    setQuestions((prev) =>
      prev.filter((question) => question.tempId !== questionId),
    );
  };

  const isEmptyQuestion = (questionData: QuestionDataInCreation) => {
    return (
      questionData.title.length === 0 &&
      questionData.answers.every((answer) => answer.value.length === 0)
    );
  };

  const handleChangeOpened = (
    nowOpening: QuestionInCreation,
    isNew: boolean,
  ) => {
    if (currQuestion) {
      if (isEmptyQuestion(currQuestion))
        setQuestions((prev) =>
          prev.filter((question) => question.tempId !== openedQuestionId),
        );
      else
        setQuestions((prev) => {
          const i = prev.findIndex(
            (question) => question.tempId === openedQuestionId,
          );
          return prev.toSpliced(i, 1, {
            tempId: openedQuestionId,
            questionData: currQuestion,
          });
        });
    }
    if (!isNew) setCurrQuestion(nowOpening.questionData);
    setOpenedQuestionId(nowOpening.tempId);
  };
  const filesUploader = useFiles();

  const saveQuizMutation = useCreateQuizMutation({
    onError: () => {
      showAlert(i18n.serverError, "error");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      showAlert(i18n.quizSaved, "success");
      void navigate("/quizzes");
    },
  });
  const getCompleteQuiz = () => {
    const currentQuestionIndex = questions.findIndex(
      (question) => question.tempId === openedQuestionId,
    );

    const allQuestions = questions.toSpliced(currentQuestionIndex, 1, {
      tempId: openedQuestionId,
      questionData: currQuestion,
    });

    return {
      title,
      description,
      isPublic: true,
      imageId: quizImageId,
      questions: allQuestions.map((question, index) => {
        return {
          title: question.questionData.title,
          index,
          imageId: question.questionData.imageId,
          answers: question.questionData.answers.map((answer, index) => {
            return {
              answerText: answer.value,
              isCorrect: answer.isCorrect,
              index,
              imageId: answer.imageId,
            };
          }),
        };
      }),
    };
  };

  const validateQuiz = (completeQuiz: NewQuiz) => {
    if (completeQuiz.title.length === 0) {
      showAlert(i18n.emptyQuizTitleError, "error");
      return false;
    }
    if (completeQuiz.description.length === 0) {
      showAlert(i18n.emptyDescriptionError, "error");
      return false;
    }
    for (const question of completeQuiz.questions) {
      if (question.title.length === 0) {
        showAlert(i18n.emptyQuestionTitleError, "error");
        return false;
      }
      if (question.answers.every((answer) => !answer.isCorrect)) {
        showAlert(i18n.noTrueAnswerError, "error");
        return false;
      }
      for (const answer of question.answers) {
        if (answer.answerText.length === 0) {
          showAlert(i18n.emptyAnswerError, "error");
          return false;
        }
      }
    }

    return true;
  };

  const onSave = () => {
    const completeQuiz = getCompleteQuiz();
    if (!validateQuiz(completeQuiz)) return;
    saveQuizMutation.mutate({ newQuiz: completeQuiz, filesUploader });
  };

  return isLoading ? (
    <LoadingMonkey isLoading={isLoading} setIsLoading={setIsLoading} />
  ) : (
    <div className="create-quiz-page">
      <img
        className="monkey"
        src="/images/create-quiz-monkey.svg"
        alt="monkey"
      />
      <TopBar handleSave={onSave} />
      <div className="create-quiz-page-content">
        <QuizTitle
          handleChangeTitle={(e) => setTitle(e.target.value)}
          handleChangeDescription={(e) => setDescription(e.target.value)}
          title={title}
          description={description}
          filesUploader={filesUploader}
          setQuizTitleImage={setQuizTitleImage}
          quizTitleImage={quizTitleImage ?? undefined}
          setQuizImageId={setQuizImageId}
        />
        <div className="questions-container">
          {currQuestion &&
            questions.map((question, i) => (
              <div key={"question" + question.tempId}>
                {openedQuestionId === question.tempId ? (
                  <CreateQuestion
                    handleDelete={() => {
                      if (questions.length > 1) handleDelete(i);
                    }}
                    originData={currQuestion}
                    filesUploader={filesUploader}
                    saveQuestionData={(
                      newQuestionData: QuestionDataInCreation,
                    ) => setCurrQuestion(structuredClone(newQuestionData))}
                    handleDuplicate={() => addQuestion(currQuestion, i + 1)}
                  />
                ) : (
                  <div onClick={() => handleChangeOpened(question, false)}>
                    <ClosedQuestion questionData={question.questionData} />
                  </div>
                )}
              </div>
            ))}
        </div>
        <img
          className="plus-button"
          src="/icons/add-question-icon.svg"
          onClick={() => addQuestion()}
        />
      </div>
    </div>
  );
};

const wrappedCreateQuizPage = withAuth(CreateQuizPage, { access: "private" });

export default wrappedCreateQuizPage;
