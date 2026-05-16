"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 select-none active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-rose-dust-400 text-white hover:bg-rose-dust-500 focus-visible:ring-rose-dust-400 disabled:bg-rose-dust-200 disabled:cursor-not-allowed",
    secondary:
      "bg-rose-dust-100 text-rose-dust-700 hover:bg-rose-dust-200 focus-visible:ring-rose-dust-300",
    outline:
      "border-2 border-rose-dust-300 text-rose-dust-600 hover:bg-rose-dust-50 focus-visible:ring-rose-dust-300",
    ghost:
      "text-charcoal hover:bg-gray-100 focus-visible:ring-gray-300",
    danger:
      "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 focus-visible:ring-red-300",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[40px]",
    md: "px-5 py-3 text-base min-h-[50px]",
    lg: "px-6 py-4 text-lg min-h-[58px]",
  };

  return (
    <button
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        disabled && "opacity-60 cursor-not-allowed active:scale-100",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
