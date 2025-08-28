import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// If you have a Toaster component, keep this import. If not, delete the next line.
import { Toaster } from "./components/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Macho Coin ($MACHO)",
  description:
    "Macho Coin ($MACHO) — Clean Jupiter integrated popup for BUY without changing your design/content.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* Keep your toaster if you have it */}
        <Toaster />

        {/* Jupiter Plugin */}
        <Script
          src="https://plugin.jup.ag/plugin-v1.js"
          strategy="afterInteractive"
          data-preload
        />

        {/* Overlay + centered modal (responsive) */}
        <div
          id="jup-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="jup-title"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "none",
            zIndex: 9999,
            background: "rgba(0,0,0,.55)",
            backdropFilter: "blur(2px)",
            height: "100dvh",
          }}
        >
          <div
            id="jup-modal"
            style={{
              position: "absolute",
              inset: 0,
              margin: "auto",
              width: "clamp(320px, 60vw, 1040px)",
              height: "clamp(420px, 60vh, 88vh)",
              maxHeight:
                "calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 24px)",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#0b0e11",
              boxShadow: "0 12px 48px rgba(0,0,0,.45)",
              marginTop: "max(12px, env(safe-area-inset-top))",
              marginBottom: "max(12px, env(safe-area-inset-bottom))",
              marginLeft: "max(12px, env(safe-area-inset-left))",
              marginRight: "max(12px, env(safe-area-inset-right))",
            }}
          >
            <button
              id="jup-close"
              aria-label="Close"
              style={{
                position: "absolute",
                top: 10,
                right: 12,
                zIndex: 1,
                cursor: "pointer",
                background: "transparent",
                border: 0,
                color: "#fff",
                fontSize: 22,
              }}
            >
              ✕
            </button>
            <div id="jup-title" style={{ position: "absolute", left: -9999 }}>
              Swap
            </div>
            <div id="jupiter-plugin" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>

        {/* Controller */}
        <Script id="jup-controller" strategy="afterInteractive">{`
          // Prefill with your token mint (auto-detected earlier):
          window.__PROJECT_TOKEN_MINT__ = "GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

          (function () {
            const backdrop = document.getElementById('jup-backdrop');
            const modal    = document.getElementById('jup-modal');
            const closeBtn = document.getElementById('jup-close');

            function lockScroll(lock){
              document.documentElement.style.overflow = lock ? 'hidden' : '';
              document.body.style.overflow = lock ? 'hidden' : '';
              document.body.style.touchAction = lock ? 'none' : '';
            }

            function openModal(){
              backdrop.style.display='block';
              backdrop.setAttribute('aria-hidden','false');
              lockScroll(true);

              if (window.Jupiter && !window.__JUP_INIT__) {
                window.__JUP_INIT__=true;
                window.Jupiter.init({
                  displayMode: "integrated",
                  integratedTargetId: "jupiter-plugin",
                  formProps: { initialOutputMint: window.__PROJECT_TOKEN_MINT__ }
                });
              }

              closeBtn?.focus();
              document.addEventListener('keydown', onKeydown);
            }

            function closeModal(){
              backdrop.setAttribute('aria-hidden','true');
              backdrop.style.display='none';
              lockScroll(false);
              document.removeEventListener('keydown', onKeydown);
            }

            function onKeydown(e){
              if (e.key === 'Escape') closeModal();
            }

            // Close on backdrop click (but not inside modal)
            backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
            closeBtn?.addEventListener('click', closeModal);

            // Wire all Buy buttons
            window.addEventListener('DOMContentLoaded', () => {
              document.querySelectorAll('[data-jup-buy]')
                .forEach(btn => btn.addEventListener('click', openModal));
            });
          })();
        `}</Script>
      </body>
    </html>
  );
}
