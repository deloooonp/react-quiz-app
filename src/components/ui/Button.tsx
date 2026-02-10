import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  leftIcon,
  rightIcon,
  fullWidth = true,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 transition-all shadow-sm group disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-primary hover:bg-primary/90 text-white",
    secondary:
      "bg-transparent hover:bg-border text-secondary border border-transparent hover:border-border",
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <div className="mr-2 flex items-center">{leftIcon}</div>}
      <span className="truncate text-base font-bold leading-normal tracking-[0.015em]">
        {children}
      </span>
      {rightIcon && (
        <div className="ml-2 flex items-center transition-transform group-hover:translate-x-1">
          {rightIcon}
        </div>
      )}
    </button>
  );
}
