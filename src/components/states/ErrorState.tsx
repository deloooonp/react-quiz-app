import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/Button";

export function ErrorState({ error }: { error: string }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">Oops!</h1>
      <p className="text-secondary mb-6">{error}</p>
      <Button
        onClick={() => window.location.reload()}
        fullWidth={false}
        className="px-8"
        leftIcon={<RefreshCcw className="size-5" />}
      >
        Try Again
      </Button>
    </div>
  );
}
