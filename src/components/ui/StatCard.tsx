import type { StatCardProps, StatCardVariant } from "@/types";

export function StatCard({
  label,
  value,
  variant = "default",
  icon,
}: StatCardProps) {
  const variantStyles: Record<StatCardVariant, string> = {
    default: "bg-background border-border text-black",
    success: "bg-green-50 border-green-200 text-green-700",
    error: "bg-red-50 border-red-200 text-red-700",
    warning: "bg-orange-50 border-orange-200 text-orange-700",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 rounded-lg border border-solid transition-all ${variantStyles[variant]}`}
    >
      <p className="text-2xl font-bold leading-tight mb-1">{value}</p>
      <div className="flex items-center gap-1.5 opacity-90">
        {icon && <div className="flex items-center">{icon}</div>}
        <p className="text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}
