interface ScoreCircleProps {
  percentage: number;
}

export default function ScoreCircle({ percentage }: ScoreCircleProps) {
  // SVG dasharray constants (r=45, circumference ≈ 283)
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative size-40 mb-10 flex items-center justify-center">
      <svg className="size-full -rotate-90 transform" viewBox="0 0 100 100">
        <circle
          className="text-accent"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
        />
        <circle
          className="text-primary transition-all duration-1000 ease-out"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold">{percentage}%</span>
        <span className="text-xs font-medium text-secondary uppercase tracking-wider mt-1">
          Score
        </span>
      </div>
    </div>
  );
}
