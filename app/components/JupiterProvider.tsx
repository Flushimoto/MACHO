'use client';

import React, { createContext, useCallback, useContext, useRef, useState } from "react";

type JupiterCtx = {
  openJupiterModal: (opts?: { inputMint?: string; outputMint?: string }) => void;
  isInitializing: boolean;
};

const Ctx = createContext<JupiterCtx | null>(null);

export function JupiterProvider({ children }: { children: React.ReactNode }) {
  const [isInitializing, setIsInitializing] = useState(false);
  const instanceRef = useRef<any>(null);
  const loadingRef = useRef<Promise<any> | null>(null);

  const ensureLoaded = useCallback(async () => {
    if (!loadingRef.current) {
      loadingRef.current = import("@jup-ag/plugin");
    }
    return loadingRef.current;
  }, []);

  const ensureInstance = useCallback(async (opts?: { inputMint?: string; outputMint?: string }) => {
    if (instanceRef.current) return instanceRef.current;
    const mod = await ensureLoaded();
    const init = mod.init;

    const defaultInputMint = opts?.inputMint ?? "So11111111111111111111111111111111111111112"; // SOL
    const defaultOutputMint = opts?.outputMint ?? (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "");

    const instance = await init({
      displayMode: "modal",
      endpoint: "https://api.jup.ag/api",
      defaultInputMint,
      defaultOutputMint: defaultOutputMint || undefined,
      strictTokenList: false,
      autoConnect: false,
      onSuccess: ({ txid }: { txid: string }) => {
        console.log("[Jupiter] swap success", txid);
      },
      onSwapError: (e: unknown) => {
        console.error("[Jupiter] swap error", e);
      },
      onRouteNotFound: () => {
        console.warn("[Jupiter] route not found");
      },
    });

    instanceRef.current = instance;
    return instanceRef.current;
  }, [ensureLoaded]);

  const openJupiterModal = useCallback(async (opts?: { inputMint?: string; outputMint?: string }) => {
    try {
      setIsInitializing(true);
      const inst = await ensureInstance(opts);
      inst.open();
    } catch (e) {
      console.error("[Jupiter] open failed", e);
    } finally {
      setIsInitializing(false);
    }
  }, [ensureInstance]);

  return (
    <Ctx.Provider value={{ openJupiterModal, isInitializing }}>
      {children}
    </Ctx.Provider>
  );
}

export function useJupiter() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useJupiter must be used within JupiterProvider");
  return ctx;
}
