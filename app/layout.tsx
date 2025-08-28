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

        {/* Dim backdrop */}
        <div
          id="jup-backdrop"
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

        {/* Tight, centered container around the widget */}
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
          <div id="jup-title" style={{ position: "absolute", left: -9999 }}>Swap</div>
          <div id="jupiter-plugin" style={{ width: "100%", height: "100%" }} />
        </div>

        {/* Controller (pure JS; instant outside-close via document capture) */}
        <Script id="jup-controller" strategy="afterInteractive">{`
          (function () {
            window.__PROJECT_TOKEN_MINT__ = "GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";
            var backdrop = document.getElementById('jup-backdrop');
            var modal = document.getElementById('jup-modal');
            var pushed = false; // history entry while modal is open

            function lockScroll(lock){
              document.documentElement.style.overflow = lock ? 'hidden' : '';
              document.body.style.overflow = lock ? 'hidden' : '';
              document.body.style.touchAction = lock ? 'none' : '';
            }

            function ensureJupiterLoaded(timeoutMs){
              timeoutMs = timeoutMs || 8000;
              return new Promise(function(resolve, reject){
                if (window.Jupiter) return resolve(window.Jupiter);
                var t0 = Date.now();
                var timer = setInterval(function(){
                  if (window.Jupiter) { clearInterval(timer); resolve(window.Jupiter); }
                  else if (Date.now() - t0 > timeoutMs) { clearInterval(timer); reject(new Error("Jupiter script not loaded")); }
                }, 100);
              });
            }

            function show(){
              backdrop.style.display = 'block';
              modal.style.display = 'block';
              lockScroll(true);
            }
            function hide(){
              modal.style.display = 'none';
              backdrop.style.display = 'none';
              lockScroll(false);
            }

            // Close immediately when tapping/clicking anywhere OUTSIDE the modal (document-level, capture phase)
            function onDocPointerDown(e){
              if (!modal.contains(e.target)) {
                closeModal(false);
              }
            }

            async function openModal(){
              show();
              // Trap phone back button to close modal first
              if (!pushed) {
                try { history.pushState({ jupOpen: true }, "", location.href); } catch(e) {}
                pushed = true;
                window.addEventListener('popstate', onPopState, { once: true });
              }
              // Start outside-close listener
              document.addEventListener('pointerdown', onDocPointerDown, true);

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
                hide(); pushed = false; document.removeEventListener('pointerdown', onDocPointerDown, true);
                console.error(e);
              }
            }

            function closeModal(fromPop){
              // Remove listener first so a second tap doesn't re-trigger after hide
              document.removeEventListener('pointerdown', onDocPointerDown, true);
              hide();
              // Consume our history entry so the next Back won't leave the site
              if (pushed && !fromPop) { try { history.back(); } catch(e) {} }
              pushed = false;
            }

            function onPopState(){
              if (modal.style.display !== 'none') {
                closeModal(true);
                setTimeout(function(){ window.addEventListener('popstate', onPopState, { once: true }); }, 0);
              }
            }

            // Also close if the user taps the dim backdrop specifically
            backdrop.addEventListener('click', function(e){
              if (e.target === backdrop) closeModal(false);
            });

            window.__openJupModal = openModal;
            window.__closeJupModal = closeModal;
          })();
        `}</Script>
      </body>
    </html>
  );
}
