import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import type { QuizQuestion } from "@/types/quiz";

type ResultState = {
  questions: QuizQuestion[];
  answers: Record<string, string>;
};

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ResultState | null;

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null;

  const { questions, answers } = state;

  const score = questions.reduce((total, q) => {
    const userAnswer = answers[q.id];

    if (userAnswer === q.correctOptionId) {
      return total + 1;
    }
    return total;
  }, 0);

  const answered = Object.keys(answers).length;
  const wrong = answered - score;
  const unanswered = questions.length - answered;

  return (
    <div>
      <h1>Result</h1>
      <p>
        Score: {score} / {questions.length}
      </p>
      <p>Correct: {score}</p>
      <p>Wrong: {wrong}</p>
      <p>Unanswered: {unanswered}</p>
      <button onClick={() => navigate("/")}>Back to Home</button>
      <br />
      <button
        onClick={() => {
          localStorage.removeItem("username");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}
