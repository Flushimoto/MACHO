'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

type JupiterCtx = {
  openJupiterModal: (opts?: { inputMint?: string; outputMint?: string }) => void;
  isInitializing: boolean;
};

const Ctx = createContext<JupiterCtx | null>(null);

function loadJupiterScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('No window'));
    // Already loaded?
    // @ts-ignore
    if (window.Jupiter) return resolve();

    const id = 'jupiter-terminal-script';
    const existing = document.getElementById(id);
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
  const initializedRef = useRef(false);

  const openJupiterModal = useCallback(async (opts?: { inputMint?: string; outputMint?: string }) => {
    try {
      setIsInitializing(true);
      await loadJupiterScript();

      // @ts-ignore
      const J = window.Jupiter;
      if (!J || typeof J.init !== 'function') throw new Error('Jupiter not available');

      const inMint = opts?.inputMint ?? 'So11111111111111111111111111111111111111112'; // SOL mint
      const outMint = opts?.outputMint ?? (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '');

      // IMPORTANT: do NOT auto-open on first init; only open here on demand
      const instance = await J.init({
        displayMode: 'modal',
        endpoint: 'https://api.jup.ag/api', // standard public endpoint
        defaultInputMint: inMint,
        defaultOutputMint: outMint,
        strictTokenList: false,
        autoConnect: false,
        // No onLoad auto-open; we explicitly call `instance.open()` after init.
      });

      instance.open();
      initializedRef.current = true;
    } catch (e) {
      console.error(e);
      // Graceful fallback: open the web swap in a new tab
      const out = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
      const url = out
        ? `https://jup.ag/swap/SOL-${out}`
        : `https://jup.ag/swap`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } finally {
      setIsInitializing(false);
    }
  }, []);

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
