import { createI18nText } from "../i18n-init";

export const createQuizPage = createI18nText({
  he: {
    emptyQuestionTitleError: "אי אפשר לשמור שאלה ללא כותרת",
    noTrueAnswerError: "אי אפשר לשמור שאלה ללא תשובה נכונה",
    emptyAnswerError: "אי אפשר לשמור תשובה ריקה",
    emptyDescriptionError: "אי אפשר לשמור חידון בלי תיאור",
    emptyQuizTitleError: "אי אפשר לשמור חידון בלי כותרת",
    quizSaved: "החידון נשמר בהצלחה",
    serverError: "אירעה שגיאה, אנא נסה שוב",
  },
  en: {
    emptyQuestionTitleError: "can not save a question without a title",
    noTrueAnswerError: "can not save a question without a right answer",
    emptyAnswerError: "can not save an empty answer",
    emptyDescriptionError: "can not save  a quiz without a description",
    emptyQuizTitleError: "can not save a quiz without a title",
    quizSaved: "saved quiz successfully",
    serverError: "an error occurred, please try again",
  },
});
