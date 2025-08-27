'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const SOL = 'So11111111111111111111111111111111111111112';
const MACHO = 'GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump';

interface JupiterContextType {
  openJupiterModal: () => void;
  isInitializing: boolean;
}

const JupiterContext = createContext<JupiterContextType | null>(null);

export const JupiterProvider = ({ children }: { children: React.ReactNode }) => {
  const jupiterInstance = useRef<any>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://terminal.jup.ag/main-v2.js';
    script.async = true;
    script.onload = () => {
      window.Jupiter.init({
        endpoint: "https://api.mainnet-beta.solana.com",
        inputMint: SOL,
        outputMint: MACHO,
      }).then((jupiter) => {
        jupiterInstance.current = jupiter;
        setIsInitializing(false);
      });
    };
    document.head.appendChild(script);

    return () => {
      jupiterInstance.current?.close();
      document.head.removeChild(script);
    };
  }, []);

  const openJupiterModal = () => {
    if (jupiterInstance.current) {
      jupiterInstance.current.open();
    }
  };

  return (
    <JupiterContext.Provider value={{ openJupiterModal, isInitializing }}>
      {children}
    </JupiterContext.Provider>
  );
};

export const useJupiter = () => {
  const context = useContext(JupiterContext);
  if (!context) {
    throw new Error('useJupiter must be used within a JupiterProvider');
  }
  return context;
};
