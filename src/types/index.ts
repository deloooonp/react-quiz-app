import type { ReactNode, ButtonHTMLAttributes } from "react";
import type { QuizQuestion } from "./quiz";

export * from "./quiz";
export * from "./opentdb";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

// Component Types
export type StatCardVariant = "default" | "success" | "error" | "warning";

export interface StatCardProps {
  label: string;
  value: string | number;
  variant?: StatCardVariant;
  icon?: ReactNode;
}

export interface ScoreCircleProps {
  percentage: number;
}

export type ResultState = {
  questions: QuizQuestion[];
  answers: Record<string, string>;
};

export interface QuizProgressProps {
  currentIndex: number;
  questions: QuizQuestion[];
  timeLeft: number;
}
