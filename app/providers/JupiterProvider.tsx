"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Jupiter Modal to avoid SSR issues
const JupiterModal = dynamic(
  () => import("@jup-ag/react-hook").then((mod) => mod.JupiterModal),
  { ssr: false }
);

export default function JupiterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {children}

      {/* Jupiter Modal */}
      <JupiterModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        defaultInputMint="So11111111111111111111111111111111111111112" // SOL
        defaultOutputMint="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" // USDC
      />

      {/* Hidden global trigger for buttons */}
      <button
        id="open-jupiter-modal"
        className="hidden"
        onClick={() => setIsOpen(true)}
      />
    </>
  );
}
