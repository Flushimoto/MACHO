"use client";

import { twMerge } from "tailwind-merge";

interface BuyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "normal" | "large";
}

export default function BuyButton({
  variant = "primary",
  size = "normal",
  className,
  ...props
}: BuyButtonProps) {
  const base = "inline-flex items-center justify-center rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-macho-orange text-black hover:opacity-90",
    secondary: "bg-ink border border-ink-secondary text-off-white hover:border-macho-orange",
  };
  const sizes = {
    normal: "px-4 py-2 text-sm",
    large: "px-8 py-4 text-lg",
  };

  return (
    <button
      type="button"
      onClick={() => document.getElementById("open-jupiter-modal")?.click()}
      className={twMerge(base, variants[variant], sizes[size], className)}
      {...props}
    >
      Buy $MACHO
    </button>
  );
}
