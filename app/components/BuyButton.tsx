'use client';

import React from "react";
// Keep this if you have a toast helper; otherwise you can remove the import and the toast call.
import { toast } from "./ui/Toast";
import { twMerge } from "tailwind-merge";

interface BuyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accept and preserve existing usages */
  variant?: "primary" | "secondary" | string;
  size?: "normal" | "large" | string;
}

// Keep this so any `disabled={isInitializing}` usage compiles
const isInitializing = false;

export default function BuyButton({
  className,
  children,
  onClick,
  variant = "primary",
  size = "normal",
  ...props
}: BuyButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    try { if (typeof (toast as any)?.show === "function") toast.show("Launching Jupiter..."); } catch {}
    try { (window as any).__openJupModal?.(); } catch {}
    onClick?.(e);
  };

  // Default look = your original: red rectangle, slight roundness, white text.
  const baseClasses =
    "inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background select-none";
  const variantClasses: Record<string, string> = {
    primary: "bg-macho-red text-white hover:bg-red-500 shadow-macho",
    secondary: "bg-transparent border-2 border-macho-orange text-macho-orange hover:bg-macho-orange hover:text-ink",
  };
  const sizeClasses: Record<string, string> = {
    normal: "px-5 py-2.5 text-sm",
    large: "px-8 py-4 text-lg",
  };

  return (
    <button
      data-jup-buy
      onClick={handleClick}
      disabled={isInitializing || props.disabled}
      className={twMerge(
        baseClasses,
        variantClasses[variant] ?? "",
        sizeClasses[size] ?? "",
        className
      )}
      {...props}
    >
      {children ?? (isInitializing ? "Loading..." : "Buy $MACHO")}
    </button>
  );
}
