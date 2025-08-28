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

        {/* Jupiter Plugin */}
        <Script
          src="https://plugin.jup.ag/plugin-v1.js"
          strategy="afterInteractive"
          data-preload
        />

        {/* Backdrop (click to close) */}
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
          }}
        />

        {/* Tight, centered frame just larger than the widget */}
        <div
          id="jup-modal"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(95vw, 560px)",
            height: "min(90svh, 720px)",
            background: "transparent",
            borderRadius: "10px",
            overflow: "hidden",
            display: "none",
            zIndex: 10000,
          }}
        >
          <div id="jup-title" style={{ position: "absolute", left: -9999 }}>
            Swap
          </div>
          <div id="jupiter-plugin" style={{ width: "100%", height: "100%" }} />
        </div>

        {/* Controller: exposes window.__openJupModal / __closeJupModal and traps browser back */}
        <Script id="jup-controller" strategy="afterInteractive">{`
          // Prefill with your token mint:
          window.__PROJECT_TOKEN_MINT__ = "GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

          (function () {
            const backdrop = document.getElementById('jup-backdrop');
            const modal = document.getElementById('jup-modal');

            let pushed = false; // track history entry we add while the modal is open

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

            function show(){
              backdrop.style.display = 'block';
              modal.style.display = 'block';
              backdrop.setAttribute('aria-hidden','false');
              lockScroll(true);
            }
            function hide(){
              backdrop.setAttribute('aria-hidden','true');
              modal.style.display = 'none';
              backdrop.style.display = 'none';
              lockScroll(false);
            }

            async function openModal(){
              show();
              // push a history entry so Android/iOS back button closes modal instead of leaving the site
              if (!pushed) {
                try { history.pushState({ jupOpen: true }, "", location.href); } catch {}
                pushed = true;
                window.addEventListener('popstate', onPopState, { once: true });
              }
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
                hide();
                pushed = false;
                console.error(e);
              }
            }

            function closeModal(fromPop=false){
              hide();
              // If we pushed a history entry and the close didn't come from a back action,
              // consume that extra entry so the next back doesn't navigate away.
              if (pushed && !fromPop) {
                try { history.back(); } catch {}
              }
              pushed = false;
            }

            function onPopState(){
              // A back action happened; if modal is open, close it and stop navigation here.
              const isOpen = modal.style.display !== 'none';
              if (isOpen) {
                closeModal(true);
                // re-arm popstate for future opens
                setTimeout(() => window.addEventListener('popstate', onPopState, { once: true }), 0);
              }
            }

            // Close on backdrop click
            backdrop.addEventListener('click', () => closeModal(false));

            // Expose globals so buttons can call it directly
            window.__openJupModal = openModal;
            window.__closeJupModal = closeModal;
          })();
        `}</Script>
      </body>
    </html>
  );
}
