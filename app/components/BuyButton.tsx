'use client';

import React from "react";
import { twMerge } from "tailwind-merge";
// If you use a toast utility, keep this import. If not, remove it.
import { toast } from "./ui/Toast";

interface BuyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "normal" | "large";
}

// Keep this to prevent type errors if other code references isInitializing
const isInitializing = false;

export default function BuyButton({
  variant = "primary",
  size = "normal",
  className,
  children,
  ...props
}: BuyButtonProps) {
  const handleClick = () => {
    try {
      // Optional UX feedback; safe to remove if you don't use toast
      if (typeof (toast as any)?.show === "function") toast.show("Launching Jupiter...");
    } catch {}
    // The actual opening is handled by the global [data-jup-buy] listener in app/layout.tsx
  };

  const baseClasses =
    "font-bold uppercase transition-colors duration-150 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses: Record<NonNullable<BuyButtonProps["variant"]>, string> = {
    primary: "bg-yellow-400 text-black hover:bg-yellow-300 focus:ring-yellow-300",
    secondary:
      "bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black focus:ring-yellow-300",
  };
  const sizeClasses: Record<NonNullable<BuyButtonProps["size"]>, string> = {
    normal: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  return (
    <button
      data-jup-buy
      onClick={handleClick}
      disabled={isInitializing || props.disabled}
      className={twMerge(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children ?? (isInitializing ? "Loading..." : "Buy $MACHO")}
    </button>
  );
}
