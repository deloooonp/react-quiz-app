import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { fetchQuiz } from "@/api/opentdb";
import { transformQuestions } from "@/lib/transform";
import type { QuizQuestion } from "@/types/quiz";

export default function Quiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Quiz</h1>
      <pre>{JSON.stringify(questions[0], null, 2)}</pre>
    </div>
  );
}
