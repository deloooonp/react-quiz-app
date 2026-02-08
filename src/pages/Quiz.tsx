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

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    // Mencegah error 429 (Too Many Requests)
    if (hasFetched.current) return;
    hasFetched.current = true;

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
      navigate("/result", {
        state: { questions, answers },
      });
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
