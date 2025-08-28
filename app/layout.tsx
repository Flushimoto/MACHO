import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Macho Coin ($MACHO)",
  description:
    "Macho Coin ($MACHO) — Jupiter integrated popup (overlay) wired to Buy buttons, no design/content changes.",
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

        {/* Minimal global guard: prevent accidental horizontal overflow on small screens */}
        <style
          // safe, surgical; doesn't change look, only prevents sideways scroll
          dangerouslySetInnerHTML={{
            __html: `
              html, body { max-width: 100%; overflow-x: clip; }
            `,
          }}
        />

        {/* Jupiter Plugin */}
        <Script
          src="https://plugin.jup.ag/plugin-v1.js"
          strategy="afterInteractive"
          data-preload
        />

        {/* Overlay (hidden until opened) */}
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
            height: "100svh", // robust on mobile
          }}
        >
          <div
            id="jup-modal"
            // Robust centering on every device & orientation
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(1040px, 60vw)",
              height: "min(88svh, 60vh)",
              borderRadius: "14px",
              overflow: "hidden",
              background: "#0b0e11",
              boxShadow: "0 12px 48px rgba(0,0,0,.45)",
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

        {/* Controller: exposes window.__openJupModal / __closeJupModal */}
        <Script id="jup-controller" strategy="afterInteractive">{`
          // Prefill with your token mint:
          window.__PROJECT_TOKEN_MINT__ = "GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

          (function () {
            const backdrop = document.getElementById('jup-backdrop');
            const closeBtn = document.getElementById('jup-close');

            function lockScroll(lock){
              document.documentElement.style.overflow = lock ? 'hidden' : '';
              document.body.style.overflow = lock ? 'hidden' : '';
              document.body.style.touchAction = lock ? 'none' : '';
            }

            function ensureJupiterLoaded(timeoutMs = 8000) {
              return new Promise((resolve, reject) => {
                if (window.Jupiter) return resolve(window.Jupiter);
                const started = Date.now();
                const timer = setInterval(() => {
                  if (window.Jupiter) {
                    clearInterval(timer);
                    resolve(window.Jupiter);
                  } else if (Date.now() - started > timeoutMs) {
                    clearInterval(timer);
                    reject(new Error("Jupiter script not loaded"));
                  }
                }, 100);
              });
            }

            async function openModal(){
              // Show overlay immediately; initialize plugin lazily
              backdrop.style.display='block';
              backdrop.setAttribute('aria-hidden','false');
              lockScroll(true);

              try {
                await ensureJupiterLoaded();

                if (!window.__JUP_INIT__) {
                  window.__JUP_INIT__ = true;
                  window.Jupiter.init({
                    displayMode: "integrated",
                    integratedTargetId: "jupiter-plugin",
                    formProps: { initialOutputMint: window.__PROJECT_TOKEN_MINT__ }
                  });
                }
              } catch (e) {
                // Failed to load plugin—revert overlay
                backdrop.style.display='none';
                backdrop.setAttribute('aria-hidden','true');
                lockScroll(false);
                console.error(e);
                return;
              }

              // Focus close button and bind Esc
              closeBtn?.focus();
              document.addEventListener('keydown', onKeydown);
            }

            function closeModal(){
              backdrop.setAttribute('aria-hidden','true');
              backdrop.style.display='none';
              lockScroll(false);
              document.removeEventListener('keydown', onKeydown);
            }

            function onKeydown(e){ if (e.key === 'Escape') closeModal(); }

            // Close when clicking outside the modal
            backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
            closeBtn?.addEventListener('click', closeModal);

            // Expose global open/close so components can trigger directly
            window.__openJupModal = openModal;
            window.__closeJupModal = closeModal;
          })();
        `}</Script>
      </body>
    </html>
  );
}
