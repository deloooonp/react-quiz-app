import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Timer, CheckCircle2 } from "lucide-react";

import { fetchQuiz } from "@/api/opentdb";
import { transformQuestions } from "@/lib/transform";
import type { QuizQuestion } from "@/types/quiz";
import { Header, Button, LoadingState, ErrorState } from "@/components";
import QuizProgress from "@/components/QuizProgress";

export default function Quiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentIndex];
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const hasResumed = useRef(false);

  const TOTAL_TIME = 60;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const finishQuiz = useCallback(() => {
    localStorage.removeItem("quiz-progress");
    navigate("/result", {
      state: { questions, answers },
    });
  }, [navigate, questions, answers]);

  // Load dari Local
  useEffect(() => {
    const saved = localStorage.getItem("quiz-progress");
    if (saved) {
      const parsed = JSON.parse(saved);
      setQuestions(parsed.questions);
      setAnswers(parsed.answers);
      setCurrentIndex(parsed.currentIndex);
      setTimeLeft(parsed.timeLeft);
      hasResumed.current = true;
      setLoading(false);
    }
  }, []);

  // Fetch Quiz
  useEffect(() => {
    // Prevent 429 error
    if (hasFetched.current || hasResumed.current) return;
    hasFetched.current = true;

    const loadQuiz = async () => {
      try {
        const data = await fetchQuiz(5);
        if (data.response_code !== 0) {
          throw new Error("Failed to fetch questions. Please try again.");
        }
        setQuestions(transformQuestions(data.results));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, []);

  // Timer Quiz
  useEffect(() => {
    if (loading || !questions.length || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, questions.length, timeLeft, finishQuiz]);

  // Simpen Quiz ke local
  useEffect(() => {
    if (!questions.length || loading) return;
    const data = { questions, answers, currentIndex, timeLeft };
    localStorage.setItem("quiz-progress", JSON.stringify(data));
  }, [questions, answers, currentIndex, timeLeft, loading]);

  // Route Guard
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) navigate("/");
  }, [navigate]);

  function handleSelect(optionId: string) {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      finishQuiz();
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!questions.length) return null;

  return (
    <div className="min-h-screen bg-background font-display flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center py-6 md:py-10 px-4 sm:px-6 w-full max-w-[800px] mx-auto gap-8">
        <QuizProgress
          currentIndex={currentIndex}
          questions={questions}
          timeLeft={timeLeft}
        />

        <div className="flex flex-col gap-6 w-full">
          <h1
            className="tracking-tight text-2xl md:text-3xl font-bold leading-tight text-center md:text-left"
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          {currentQuestion.options.map((opt) => {
            const isSelected = answers[currentQuestion.id] === opt.id;
            return (
              <label
                key={opt.id}
                className={`
                  group relative flex items-center gap-4 rounded-xl border-2 border-solid p-5 cursor-pointer 
                  transition-all duration-200
                  ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-white hover:border-primary/50 hover:bg-primary/5"
                  }
                `}
              >
                <input
                  type="radio"
                  name="quiz-answer"
                  className="peer opacity-0 absolute"
                  checked={isSelected}
                  onChange={() => handleSelect(opt.id)}
                />

                <div
                  className={`
                  size-6 rounded-full border-2 flex items-center justify-center transition-all
                  ${isSelected ? "border-primary" : "border-[#dbe0e6]"}
                `}
                >
                  {isSelected && (
                    <div className="size-3 rounded-full bg-primary" />
                  )}
                </div>

                <div className="flex grow flex-col">
                  <p
                    className={`text-base md:text-lg font-medium leading-normal transition-colors ${isSelected ? "text-primary" : "text-[#111418] group-hover:text-primary"}`}
                    dangerouslySetInnerHTML={{ __html: opt.text }}
                  />
                </div>

                <div
                  className={`absolute right-5 transition-opacity duration-200 ${isSelected ? "opacity-100" : "opacity-0"}`}
                >
                  <CheckCircle2 className="size-6 text-primary" />
                </div>
              </label>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row justify-between pt-6 border-t border-border mt-4 w-full gap-4">
          <Button
            variant="secondary"
            fullWidth={false}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            fullWidth={false}
          >
            {currentIndex < questions.length - 1
              ? "Next Question"
              : "See Results"}
          </Button>
        </div>
      </main>
    </div>
  );
}
