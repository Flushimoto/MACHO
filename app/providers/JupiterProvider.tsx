"use client";

import { useRef, useState } from "react";

function waitForJupiter(timeoutMs = 10000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      if (typeof window !== "undefined" && (window as any).Jupiter) return resolve();
      if (Date.now() - start > timeoutMs) return reject(new Error("Jupiter script failed to load"));
      setTimeout(tick, 50);
    };
    tick();
  });
}

export default function JupiterProvider() {
  const instanceRef = useRef<any>(null);
  const [isOpening, setIsOpening] = useState(false);

  const openModal = async () => {
    try {
      setIsOpening(true);
      await waitForJupiter();
      const J = (window as any).Jupiter;
      if (!instanceRef.current) {
        instanceRef.current = await J.init({
          displayMode: "modal",
          defaultInputMint: "So11111111111111111111111111111111111111112",
          defaultOutputMint: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || undefined,
          strictTokenList: false,
          autoConnect: false,
          onSuccess: ({ txid }: { txid: string }) => console.log("[Jupiter] success", txid),
          onSwapError: (e: unknown) => console.error("[Jupiter] error", e),
          onRouteNotFound: () => console.warn("[Jupiter] route not found")
        });
      }
      instanceRef.current.open();
    } catch (e) {
      console.error("[Jupiter] open failed:", e);
    } finally {
      setIsOpening(false);
    }
  };

  return (
    <button
      id="open-jupiter-modal"
      style={{ display: "none" }}
      onClick={openModal}
      disabled={isOpening}
      aria-hidden="true"
    >
      Open Jupiter
    </button>
  );
}
