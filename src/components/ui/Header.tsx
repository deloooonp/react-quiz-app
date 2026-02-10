import { GraduationCap } from "lucide-react";

export function Header() {
  return (
    <header className="w-full flex items-center justify-between whitespace-nowrap border-b border-solid border-border px-10 py-3 bg-white">
      <div className="flex items-center gap-4 text-black">
        <div className="size-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
          <GraduationCap className="size-6" />
        </div>
        <h2 className="text-black text-lg font-bold leading-tight tracking-[-0.015em]">
          QuizMaster
        </h2>
      </div>
    </header>
  );
}
