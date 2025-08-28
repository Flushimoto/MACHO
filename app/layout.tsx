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
            zIndex: 10000,
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

        {/* Controller (PURE JS) */}
        <Script id="jup-controller" strategy="afterInteractive">{`
          window.__PROJECT_TOKEN_MINT__ = "GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

          (function () {
            var backdrop = document.getElementById('jup-backdrop');
            var pushed = false; // history entry while modal is open

            function lockScroll(lock){
              document.documentElement.style.overflow = lock ? 'hidden' : '';
              document.body.style.overflow = lock ? 'hidden' : '';
              document.body.style.touchAction = lock ? 'none' : '';
            }

            function ensureJupiterLoaded(timeoutMs) {
              if (!timeoutMs) timeoutMs = 8000;
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
              backdrop.style.display = 'flex'; // flex centers modal
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
              // Make phone back close the modal first
              if (!pushed) {
                try { history.pushState({ jupOpen: true }, "", location.href); } catch(e) {}
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
                hide(); pushed = false; console.error(e);
              }
            }

            function closeModal(fromPop){
              hide();
              if (pushed && !fromPop) { try { history.back(); } catch(e) {} }
              pushed = false;
            }

            function onPopState(){
              if (backdrop.style.display !== 'none') {
                closeModal(true);
                setTimeout(function(){ window.addEventListener('popstate', onPopState, { once: true }); }, 0);
              }
            }

            // Close only on true outside tap (backdrop itself, not inside content)
            backdrop.addEventListener('click', function(e){
              if (e.target === e.currentTarget) closeModal(false);
            });
            backdrop.addEventListener('touchstart', function(e){
              if (e.target === e.currentTarget) closeModal(false);
            }, { passive: true });

            window.__openJupModal = openModal;
            window.__closeJupModal = closeModal;
          })();
        `}</Script>
      </body>
    </html>
  );
}
