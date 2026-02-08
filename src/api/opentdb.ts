import type { OpenTDBResponse } from "@/types/opentdb";

export async function fetchQuiz(amount = 5): Promise<OpenTDBResponse> {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=18&type=multiple`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch quiz");
  }

  return res.json();
}
