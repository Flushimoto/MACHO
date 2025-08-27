"use client";

import React from "react";

interface BuyButtonProps {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

export default function BuyButton({
  variant = "primary",
  size = "medium",
}: BuyButtonProps) {
  const baseStyles =
    "font-semibold rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles =
    variant === "primary"
      ? "bg-yellow-500 text-black hover:bg-yellow-400 focus:ring-yellow-500"
      : "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-600";
  const sizeStyles =
    size === "small"
      ? "px-3 py-1 text-sm"
      : size === "large"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2 text-base";

  return (
    <button
      onClick={() =>
        document.getElementById("open-jupiter-modal")?.click()
      }
      className={`${baseStyles} ${variantStyles} ${sizeStyles}`}
    >
      Buy $MACHO
    </button>
  );
}
