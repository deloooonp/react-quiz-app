export function LoadingState() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="animate-spin size-10 border-4 border-primary border-t-transparent rounded-full mb-4" />
      <p className="text-secondary font-medium">Loading your challenge...</p>
    </div>
  );
}
