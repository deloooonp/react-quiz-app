export type OpenTDBQuestion = {
  category: string;
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type OpenTDBResponse = {
  response_code: number;
  results: OpenTDBQuestion[];
};
