const isInitializing = false;
'use client';
import { toast } from "./ui/Toast";
import { twMerge } from "tailwind-merge";

interface BuyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'normal' | 'large';
}

export default function BuyButton({ variant = 'primary', size = 'normal', className, ...props }: BuyButtonProps) {
    const handleClick = () => { try { if (typeof toast?.show === "function") toast.show("Launching Jupiter..."); } catch {} };

  const baseClasses = "font-bold uppercase tracking-wider rounded-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";
  
  const variantClasses = {
    primary: "bg-macho-red text-white hover:bg-red-500 shadow-macho",
    secondary: "bg-transparent border-2 border-macho-orange text-macho-orange hover:bg-macho-orange hover:text-ink",
  };

  const sizeClasses = {
    normal: "px-5 py-2.5 text-sm",
    large: "px-8 py-4 text-lg",
  };

  return (
    <button data-jup-buy
      onClick={handleClick}
      disabled={isInitializing}
      className={twMerge(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {isInitializing ? 'Loading...' : 'Buy $MACHO'}
    </button>
  );
}
