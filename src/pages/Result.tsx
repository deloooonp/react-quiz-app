import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  Home,
  HelpCircle,
} from "lucide-react";

import type { QuizQuestion } from "@/types/quiz";
import { Header, Button } from "@/components/ui";
import ScoreCircle from "@/components/ScoreCircle";

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
  const percentage = Math.round((score / questions.length) * 100);

  const statCards = [
    {
      label: "Total Questions",
      value: questions.length,
      containerClass: "bg-background border-border",
      valueClass: "text-black",
    },
    {
      label: "Correct",
      value: score,
      icon: <CheckCircle2 className="size-4 text-green-600" />,
      containerClass: "bg-green-50 border-green-200",
      valueClass: "text-green-700",
    },
    {
      label: "Incorrect",
      value: wrong,
      icon: <XCircle className="size-4 text-red-600" />,
      containerClass: "bg-red-50 border-red-200",
      valueClass: "text-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-display flex flex-col overflow-hidden">
      <Header />

      <main className="flex-1 overflow-y-auto py-10 px-4 md:px-10 flex items-center justify-center">
        <div className="w-full max-w-[600px] bg-white rounded-xl shadow-sm border border-border p-6 md:p-10 flex flex-col items-center">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mb-4 text-green-600">
              <Trophy className="size-10" />
            </div>
            <h1 className="tracking-light text-3xl font-bold leading-tight px-4">
              Quiz Completed!
            </h1>
            <p className="text-secondary text-base mt-2">
              Great job completing the assessment.
            </p>
          </div>

          <ScoreCircle percentage={percentage} />

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {statCards.map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${stat.containerClass}`}
              >
                <p
                  className={`text-2xl font-bold leading-tight mb-1 ${stat.valueClass}`}
                >
                  {stat.value}
                </p>
                <div className="flex items-center gap-1">
                  {stat.icon}
                  <p className={`${stat.valueClass} text-sm font-medium`}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {unanswered > 0 && (
            <div className="w-full flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg mb-10">
              <HelpCircle className="size-5 text-orange-600" />
              <p className="text-sm font-medium text-orange-700">
                You skipped {unanswered} question{unanswered > 1 ? "s" : ""}.
                Try to answer all of them next time!
              </p>
            </div>
          )}

          <div className="flex w-full flex-col sm:flex-row gap-4 h-28 md:h-auto">
            <Button
              onClick={() => {
                localStorage.removeItem("quiz-progress");
                navigate("/quiz");
              }}
              className="flex-1"
              leftIcon={<RefreshCcw className="size-5" />}
            >
              Restart Quiz
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/")}
              className="flex-1"
              leftIcon={<Home className="size-5" />}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
