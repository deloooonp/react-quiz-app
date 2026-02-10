import { CheckCircle2, XCircle } from "lucide-react";
import React from "react";
import type { QuizQuestion, StatCardProps } from "@/types";

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

export function getStatCardConfigs(stats: QuizStats): StatCardProps[] {
  return [
    {
      label: "Total Questions",
      value: stats.total,
      variant: "default",
    },
    {
      label: "Correct",
      value: stats.correct,
      variant: "success",
      icon: React.createElement(CheckCircle2, { className: "size-4" }),
    },
    {
      label: "Incorrect",
      value: stats.incorrect,
      variant: "error",
      icon: React.createElement(XCircle, { className: "size-4" }),
    },
  ];
}
