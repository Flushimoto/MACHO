'use client';

import React from "react";

// If you use a toast helper, keep this. If not, you can delete the import and the toast call.
import { toast } from "./ui/Toast";

interface BuyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// keep this so `disabled={isInitializing}` stays valid if used
const isInitializing = false;

export default function BuyButton({
  className,
  children,
  onClick,
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
      onClick={handleClick}
      disabled={isInitializing || props.disabled}
      className={className} // no overrides — your original red/rounded style remains
      {...props}
    >
      {children ?? (isInitializing ? "Loading..." : "Buy")}
    </button>
  );
}
