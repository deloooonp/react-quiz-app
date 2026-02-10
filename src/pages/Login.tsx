import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { User, Brain, ArrowRight } from "lucide-react";
import { Header, Button } from "@/components";

export default function Login() {
  const [username, setUsername] = useState("");
  const [existingUser, setExistingUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("username");
    if (saved) {
      setExistingUser(saved);
    }
  }, []);

  const handleStart = () => {
    const finalUsername = existingUser || username;
    if (!finalUsername.trim()) return;

    localStorage.setItem("username", finalUsername);
    navigate("/quiz");
  };

  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("quiz-progress");
    setExistingUser(null);
    setUsername("");
  };

  return (
    <div className="flex h-full w-full grow flex-col min-h-screen transition-colors duration-200">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-border overflow-hidden">
          <div className="p-8 sm:p-10 flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
              <div className="mx-auto mb-2 size-16 flex items-center justify-center rounded-full bg-primary/10 text-primary animate-pulse">
                <Brain className="size-10" />
              </div>
              <h1 className="tracking-tight text-2xl md:text-3xl font-bold leading-tight">
                {existingUser
                  ? `Welcome back, ${existingUser}!`
                  : "Welcome to QuizMaster"}
              </h1>
              <p className="text-secondary text-sm font-normal leading-relaxed px-4">
                {existingUser
                  ? "Ready to beat your high score? Click below to start your next challenge."
                  : "Test your knowledge, Enter your username to begin."}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {!existingUser ? (
                <label className="flex flex-col w-full">
                  <span className="mb-2 text-sm font-medium">Username</span>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary">
                      <User className="size-5" />
                    </div>
                    <input
                      className="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border bg-white focus:border-primary h-12 placeholder:text-secondary pl-10 pr-4 text-base font-normal leading-normal transition-all"
                      placeholder="Enter your username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleStart()}
                    />
                  </div>
                </label>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleStart}
                    rightIcon={<ArrowRight className="size-5" />}
                  >
                    Start Quiz
                  </Button>
                  <button
                    onClick={handleSignOut}
                    className="text-xs text-secondary hover:text-red-500 font-medium transition-colors cursor-pointer bg-transparent border-none py-2"
                  >
                    Not you? Sign out and enter a new name
                  </button>
                </div>
              )}

              {!existingUser && (
                <Button
                  onClick={handleStart}
                  disabled={!username.trim()}
                  rightIcon={<ArrowRight className="size-5" />}
                >
                  Start Quiz
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
