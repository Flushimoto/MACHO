"use client";

interface BuyButtonProps {
  size?: "small" | "large";
  variant?: "primary";
}

export default function BuyButton({ size = "small" }: BuyButtonProps) {
  const padding = size === "large" ? "px-6 py-3 text-lg" : "px-4 py-2 text-sm";

  return (
    <button
      className={`bg-button-bg text-button-text rounded-2xl hover:opacity-90 transition ${padding}`}
      onClick={() => {
        if (typeof window !== "undefined" && (window as any).Jupiter) {
          (window as any).Jupiter.init({
            displayMode: "modal",
          });
        }
      }}
    >
      Buy $MACHO
    </button>
  );
}
