import { useLocation, useNavigate } from "react-router-dom";
import type { QuizQuestion } from "@/types/quiz";

type ResultState = {
  questions: QuizQuestion[];
  answers: Record<string, string>;
};

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ResultState | null;

  if (!state) {
    navigate("/");
    return null;
  }

  const { questions, answers } = state;

  const score = questions.reduce((total, q) => {
    const userAnswer = answers[q.id];

    if (userAnswer === q.correctOptionId) {
      return total + 1;
    }
    return total;
  }, 0);

  return (
    <div>
      <h1>Result</h1>
      <p>
        Score: {score} / {questions.length}
      </p>
    </div>
  );
}
