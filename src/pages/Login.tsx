import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Brain } from "lucide-react";
import { Header, Button } from "@/components/ui";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!username.trim()) return;

    localStorage.setItem("username", username);
    navigate("/quiz");
  };

  return (
    <div className="layout-container flex h-full w-full grow flex-col min-h-screen transition-colors duration-200">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-border overflow-hidden">
          <div className="p-8 sm:p-10 flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
              <div className="mx-auto mb-2 size-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <Brain className="size-8" />
              </div>
              <h1 className="tracking-tight text-2xl font-bold leading-tight">
                Welcome to QuizMaster
              </h1>
              <p className="text-secondary text-sm font-normal leading-relaxed">
                Test your knowledge across various categories.
                <br className="hidden sm:block" />
                Enter your username to begin your journey.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col w-full">
                <span className="mb-2 text-sm font-medium">Username</span>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary">
                    <User className="size-5" />
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lgfocus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border bg-white focus:border-primary h-12 placeholder:text-secondary pl-10 pr-4 text-base font-normal leading-normal transition-all"
                    placeholder="Enter your username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleStart()}
                  />
                </div>
              </label>

              <Button
                onClick={handleStart}
                disabled={!username.trim()}
                showIcon
              >
                Start Quiz
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
