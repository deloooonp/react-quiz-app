import type { OpenTDBQuestion } from "@/types/opentdb";
import type { QuizQuestion } from "@/types/quiz";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function transformQuestions(
  questions: OpenTDBQuestion[],
): QuizQuestion[] {
  return questions.map((q, index) => {
    const options = shuffle([
      { id: "correct", text: q.correct_answer },
      ...q.incorrect_answers.map((ans, i) => ({
        id: `wrong-${i}`,
        text: ans,
      })),
    ]);

    return {
      id: `q-${index}`,
      question: q.question,
      options: options,
      correctOptionId: "correct",
    };
  });
}
