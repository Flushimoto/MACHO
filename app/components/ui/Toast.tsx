'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

type ToastMessage = {
  id: number;
  message: string;
};

let toastId = 0;
const listeners = new Set<(toast: ToastMessage) => void>();

export const toast = {
  show: (message: string) => {
    toastId += 1;
    listeners.forEach((listener) => listener({ id: toastId, message }));
  },
};

export function Toaster() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const addToast = useCallback((newToast: ToastMessage) => {
    setToasts((currentToasts) => [...currentToasts, newToast]);
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((t) => t.id !== newToast.id));
    }, 3000);
  }, []);

  useEffect(() => {
    listeners.add(addToast);
    return () => {
      listeners.delete(addToast);
    };
  }, [addToast]);

  if (!isBrowser) {
    return null;
  }

  return createPortal(
    <div className="fixed bottom-4 right-4 z-[100] space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-macho-orange text-ink font-bold px-4 py-2 rounded-md shadow-lg animate-fade-in-up"
        >
          {toast.message}
        </div>
      ))}
    </div>,
    document.body
  );
}

// Add this animation to your globals.css or a style tag if preferred:
/*
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}
*/
