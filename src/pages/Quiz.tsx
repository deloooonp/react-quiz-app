import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { fetchQuiz } from "@/api/opentdb";
import { transformQuestions } from "@/lib/transform";
import type { QuizQuestion } from "@/types/quiz";

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

  // Load dari Local Storage
  useEffect(() => {
    const saved = localStorage.getItem("quiz-progress");

    if (!saved) return;

    const parsed = JSON.parse(saved);

    setQuestions(parsed.questions);
    setAnswers(parsed.answers);
    setCurrentIndex(parsed.currentIndex);
    setTimeLeft(parsed.timeLeft);

    hasResumed.current = true;

    setLoading(false);
  }, []);

  // Save ke Local Storage
  useEffect(() => {
    if (!questions.length) return;
    const data = {
      questions,
      answers,
      currentIndex,
      timeLeft,
    };

    localStorage.setItem("quiz-progress", JSON.stringify(data));
  }, [questions, answers, currentIndex, timeLeft]);

  // Quiz Timer
  useEffect(() => {
    if (!questions.length) return;
    if (timeLeft <= 0) {
      finishQuiz();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, questions.length]);

  // Route Guard
  useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      navigate("/");
    }
  }, [navigate]);

  // Fetch Data Quiz
  useEffect(() => {
    // Mencegah error 429 (Too Many Requests)
    if (hasFetched.current) return;
    hasFetched.current = true;

    // Kalo udah ada quiz di local storage, jangan fetch lagi
    if (hasResumed.current) {
      setLoading(false);
      return;
    }

    const loadQuiz = async () => {
      try {
        const data = await fetchQuiz(5);
        setQuestions(transformQuestions(data.results));
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, []);

  function finishQuiz() {
    localStorage.removeItem("quiz-progress");
    navigate("/result", {
      state: { questions, answers },
    });
  }

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

  if (loading || !questions.length) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1>Quiz</h1>
      <p>
        Question {currentIndex + 1} of {questions.length}
      </p>

      <h2>{currentQuestion.question}</h2>

      <p>Time left: {timeLeft}s</p>

      <ul>
        {currentQuestion.options.map((opt) => {
          const isSelected = answers[currentQuestion.id] === opt.id;
          return (
            <li key={opt.id}>
              <button
                onClick={() => handleSelect(opt.id)}
                className={`rounded border px-4 py-2 my-2 ${
                  isSelected
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {opt.text}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        onClick={handleNext}
        disabled={!answers[currentQuestion.id]}
        className="mt-6 rounded bg-blue-500 px-4 py-2 text-white
      disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {currentIndex < questions.length - 1 ? "Next" : "Finish"}
      </button>
    </div>
  );
}
