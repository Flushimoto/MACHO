import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Macho Coin ($MACHO)",
  description: "Macho Coin ($MACHO) — Jupiter integrated popup (overlay), no design/content changes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {/* Jupiter Plugin */}
        <Script src="https://plugin.jup.ag/plugin-v1.js" strategy="afterInteractive" data-preload />

        {/* Backdrop as flex centering container */}
        <div
          id="jup-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="jup-title"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "none",         // toggled to 'flex' when open
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            background: "rgba(0,0,0,.55)",
            backdropFilter: "blur(2px)",
          }}
        >
          {/* Modal frame (tight around widget) */}
          <div
            id="jup-modal"
            style={{
              width: "min(95vw, 560px)",
              height: "min(90svh, 720px)",
              background: "transparent",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div id="jup-title" style={{ position: "absolute", left: -9999 }}>Swap</div>
            <div id="jupiter-plugin" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>

        {/* Controller */}
        <Script id="jup-controller" strategy="afterInteractive">{`
          window.__PROJECT_TOKEN_MINT__ = "GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

          (function () {
            const backdrop = document.getElementById('jup-backdrop') as HTMLElement;
            const modal = document.getElementById('jup-modal') as HTMLElement;
            let pushed = false;

            function lockScroll(lock:boolean){
              document.documentElement.style.overflow = lock ? 'hidden' : '';
              document.body.style.overflow = lock ? 'hidden' : '';
              document.body.style.touchAction = lock ? 'none' : '';
            }

            function ensureJupiterLoaded(timeoutMs = 8000) {
              return new Promise((resolve, reject) => {
                if ((window as any).Jupiter) return resolve((window as any).Jupiter);
                const t0 = Date.now();
                const timer = setInterval(() => {
                  if ((window as any).Jupiter) {
                    clearInterval(timer); resolve((window as any).Jupiter);
                  } else if (Date.now() - t0 > timeoutMs) {
                    clearInterval(timer); reject(new Error("Jupiter script not loaded"));
                  }
                }, 100);
              });
            }

            function show(){
              backdrop.style.display = 'flex';   // flex centers the modal
              backdrop.setAttribute('aria-hidden','false');
              lockScroll(true);
            }
            function hide(){
              backdrop.setAttribute('aria-hidden','true');
              backdrop.style.display = 'none';
              lockScroll(false);
            }

            async function openModal(){
              show();
              // Trap phone back button to close modal first
              if (!pushed) {
                try { history.pushState({ jupOpen: true }, "", location.href); } catch {}
                pushed = true;
                window.addEventListener('popstate', onPopState, { once: true });
              }
              try {
                await ensureJupiterLoaded();
                if (!(window as any).__JUP_INIT__) {
                  (window as any).__JUP_INIT__ = true;
                  (window as any).Jupiter.init({
                    displayMode: "integrated",
                    integratedTargetId: "jupiter-plugin",
                    formProps: { initialOutputMint: (window as any).__PROJECT_TOKEN_MINT__ }
                  });
                }
              } catch (e) {
                hide(); pushed = false; console.error(e);
              }
            }

            function closeModal(fromPop=false){
              hide();
              if (pushed && !fromPop) { try { history.back(); } catch {} }
              pushed = false;
            }

            function onPopState(){
              // Close modal instead of navigating away
              if (backdrop.style.display !== 'none') {
                closeModal(true);
                setTimeout(() => window.addEventListener('popstate', onPopState, { once: true }), 0);
              }
            }

            // Close when tapping outside the modal (only if click is exactly on the backdrop)
            backdrop.addEventListener('click', (e) => {
              if (e.target === e.currentTarget) closeModal(false);
            });

            (window as any).__openJupModal = openModal;
            (window as any).__closeJupModal = closeModal;
          })();
        `}</Script>
      </body>
    </html>
  );
}
