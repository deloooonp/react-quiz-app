import { useNavigate } from "react-router-dom";
import { GraduationCap, LogOut, User } from "lucide-react";
import { Button } from "./Button";

export function Header() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("quiz-progress");
    navigate("/");
  };

  return (
    <header className="w-full flex items-center justify-between whitespace-nowrap border-b border-solid border-border px-6 md:px-10 py-3 bg-white">
      <div
        className="flex items-center gap-4 cursor-pointer group"
        onClick={() => navigate("/")}
      >
        <div className="size-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
          <GraduationCap className="size-6" />
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          QuizMaster
        </h2>
      </div>

      {username && (
        <div className="flex items-center gap-2 md:gap-6">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-md font-bold">{username}</span>
            </div>
            <div className="size-9 rounded-full bg-accent border border-border flex items-center justify-center text-secondary border-solid">
              <User className="size-5" />
            </div>
          </div>

          <div className="h-8 w-px bg-border hidden md:block" />

          <Button
            variant="secondary"
            fullWidth={false}
            onClick={handleSignOut}
            className="h-10 border-none hover:bg-red-50 hover:text-red-600 px-3"
            leftIcon={<LogOut className="size-5" />}
          >
            <span className="hidden md:inline">Sign Out</span>
          </Button>
        </div>
      )}
    </header>
  );
}
