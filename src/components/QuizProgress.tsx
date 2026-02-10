import { Timer } from "lucide-react";

import type { QuizProgressProps } from "@/types";

export default function QuizProgress({
  currentIndex,
  questions,
  timeLeft,
}: QuizProgressProps) {
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col-reverse sm:flex-row sm:items-end justify-between gap-4 w-full">
      <div className="flex flex-col gap-2 w-full sm:w-2/3">
        <div className="flex justify-between items-center">
          <p className="text-secondary text-sm font-medium leading-normal">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <span
            className={` text-sm font-bold sm:hidden ${timeLeft < 10 ? "text-red-500 animate-pulse" : ""}`}
          >
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-border shadow-sm">
        <Timer className="size-5 text-primary" />
        <div className="flex items-baseline gap-1">
          <span
            className={`text-xl font-bold font-mono ${timeLeft < 10 ? "text-red-500 animate-pulse" : ""}`}
          >
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
