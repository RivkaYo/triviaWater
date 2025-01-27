export interface QuizItemProps {
  id: number;
  img?: string;
  title: string;
  description: string;
  numOfQuestions: number;
}

export interface WebOrMobileQuizItemProps extends QuizItemProps {
  setPopupType: (type: "copy" | "delete" | null) => void;
}
