import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  showIcon?: boolean;
}

export function Button({
  children,
  showIcon = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 
        bg-primary hover:bg-primary/90 text-white 
        transition-colors shadow-sm mt-2 group disabled:opacity-50 disabled:cursor-not-allowed
      `}
      disabled={disabled}
      {...props}
    >
      <span className="truncate mr-2 text-base font-bold leading-normal tracking-[0.015em]">
        {children}
      </span>
      {showIcon && (
        <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
      )}
    </button>
  );
}
