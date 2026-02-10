import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Trophy, CheckCircle2, XCircle, RefreshCcw, Home } from "lucide-react";
import { calculateQuizStats } from "@/lib/stats";

import type { ResultState } from "@/types";
import { Header, Button, StatCard } from "@/components/ui";
import ScoreCircle from "@/components/ScoreCircle";

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
  const stats = calculateQuizStats(questions, answers);

  const configs = [
    {
      label: "Total Questions",
      value: stats.total,
      variant: "default" as const,
    },
    {
      label: "Correct",
      value: stats.correct,
      variant: "success" as const,
      icon: <CheckCircle2 className="size-4" />,
    },
    {
      label: "Incorrect",
      value: stats.incorrect,
      variant: "error" as const,
      icon: <XCircle className="size-4" />,
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

          <ScoreCircle percentage={stats.percentage} />

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {configs.map((config, i) => (
              <StatCard key={i} {...config} />
            ))}
          </div>

          {stats.unanswered > 0 && (
            <div className="w-full mb-10">
              <StatCard
                variant="warning"
                label={`You skipped ${stats.unanswered} question${stats.unanswered > 1 ? "s" : ""}. Try to answer all of them next time!`}
                value="Unanswered"
              />
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
