'use client';

import React from "react";
// Keep this if you have a toast helper; otherwise you can remove the import and the toast call.
import { toast } from "./ui/Toast";

interface BuyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accept anything so existing usages like variant="primary" type-check */
  variant?: string;
  size?: string;
}

// Keep this so any `disabled={isInitializing}` usage compiles
const isInitializing = false;

export default function BuyButton({
  className,
  children,
  onClick,
  variant, // accepted for type-compat; not styling anything
  size,    // accepted for type-compat; not styling anything
  ...props
}: BuyButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    try { if (typeof (toast as any)?.show === "function") toast.show("Launching Jupiter..."); } catch {}
    try { (window as any).__openJupModal?.(); } catch {}
    onClick?.(e);
  };

  return (
    <button
      data-jup-buy
      data-variant={variant}
      data-size={size}
      onClick={handleClick}
      disabled={isInitializing || props.disabled}
      className={className} // your original red rectangle style remains
      {...props}
    >
      {children ?? (isInitializing ? "Loading..." : "Buy")}
    </button>
  );
}
