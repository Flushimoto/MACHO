'use client';

import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

type JupiterCtx = {
  openJupiterModal: (opts?: { inputMint?: string; outputMint?: string }) => void;
  isInitializing: boolean;
};

const Ctx = createContext<JupiterCtx | null>(null);

// Load Jupiter <script> once
function loadJupiterScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('No window'));

    // @ts-ignore
    if (window.Jupiter) return resolve();

    const id = 'jupiter-terminal-script';
    const existing = document.getElementById(id) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Script load error')), { once: true });
      return;
    }

    const s = document.createElement('script');
    s.id = id;
    s.src = 'https://terminal.jup.ag/main-v2.js';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load Jupiter script'));
    document.head.appendChild(s);
  });
}

export function JupiterProvider({ children }: { children: React.ReactNode }) {
  const [isInitializing, setIsInitializing] = useState(false);
  const instanceRef = useRef<any>(null);
  const loadingRef = useRef<Promise<void> | null>(null);

  const ensureLoaded = useCallback(async () => {
    if (!loadingRef.current) {
      loadingRef.current = loadJupiterScript();
    }
    await loadingRef.current;
  }, []);

  const ensureInstance = useCallback(async (opts?: { inputMint?: string; outputMint?: string }) => {
    // Load script once
    await ensureLoaded();

    // @ts-ignore
    const J = window.Jupiter;
    if (!J || typeof J.init !== 'function') throw new Error('Jupiter not available');

    // Reuse instance if we already created one
    if (instanceRef.current) return instanceRef.current;

    const inMint = opts?.inputMint ?? 'So11111111111111111111111111111111111111112'; // SOL mint
    const outMint = opts?.outputMint ?? (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '');

    const instance = await J.init({
      displayMode: 'modal',
      endpoint: 'https://api.jup.ag/api',
      defaultInputMint: inMint,
      defaultOutputMint: outMint || undefined,
      strictTokenList: false,
      autoConnect: false,
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
      console.error('[Jupiter] open failed:', e);
      // No window.open fallback here — prevents the extra tab.
      // If you want UX feedback, wire your Toast here.
      // toast.error("Could not open Jupiter. Try again.");
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
  if (!ctx) throw new Error('useJupiter must be used within JupiterProvider');
  return ctx;
}
