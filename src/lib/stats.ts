import type { QuizQuestion } from "@/types";

interface QuizStats {
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  percentage: number;
}

export function calculateQuizStats(
  questions: QuizQuestion[],
  answers: Record<string, string>,
): QuizStats {
  const total = questions.length;
  const correct = questions.reduce((acc, q) => {
    return answers[q.id] === q.correctOptionId ? acc + 1 : acc;
  }, 0);
  const answered = Object.keys(answers).length;
  const incorrect = answered - correct;
  const unanswered = total - answered;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return { total, correct, incorrect, unanswered, percentage };
}
