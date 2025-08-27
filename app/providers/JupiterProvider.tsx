"use client";

import { useEffect } from "react";

export default function JupiterProvider() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).Jupiter) {
      (window as any).Jupiter.init({
        displayMode: "modal",
      });
    }
  }, []);

  return (
    <button id="open-jupiter-modal" style={{ display: "none" }}>
      Open Jupiter
    </button>
  );
}
