export type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
};

export type QuizProgress = {
  currentIndex: number;
  answers: Record<string, string>;
};

export interface QuizStats {
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  percentage: number;
}
