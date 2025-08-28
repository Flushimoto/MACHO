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

        {/* Backdrop = full-viewport flex container so modal is perfectly centered on mobile */}
        <div
          id="jup-backdrop"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "none",          // set to 'flex' when open
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            background: "rgba(0,0,0,.55)",
            backdropFilter: "blur(2px)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {/* Tight, transparent frame around the widget */}
          <div
            id="jup-modal"
            style={{
              width: "min(95vw, 560px)",
              height: "min(90svh, 720px)", // svh handles iOS URL bar
              background: "transparent",
              borderRadius: "10px",
              overflow: "hidden",
              pointerEvents: "auto",
            }}
          >
            <div id="jup-title" style={{ position: "absolute", left: -9999 }}>Swap</div>
            <div id="jupiter-plugin" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>

        {/* Controller — PURE JS, instant outside-close on mobile, phone Back closes modal first */}
        <Script id="jup-controller" strategy="afterInteractive">{`
          (function () {
            // Your token (adjust if you change it)
            window.__PROJECT_TOKEN_MINT__ = "GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

            var backdrop = document.getElementById('jup-backdrop');
            var modal    = document.getElementById('jup-modal');
            var pushed   = false;   // did we push a history entry while open?
            var escBound = false;

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
              // display flex to center the modal on every phone
              backdrop.style.display = 'flex';
              backdrop.setAttribute('aria-hidden','false');
              lockScroll(true);
              // bind ESC once
              if (!escBound) {
                escBound = true;
                document.addEventListener('keydown', onKey);
              }
            }
            function hide(){
              backdrop.setAttribute('aria-hidden','true');
              backdrop.style.display = 'none';
              lockScroll(false);
              if (escBound) {
                escBound = false;
                document.removeEventListener('keydown', onKey);
              }
            }
            function onKey(e){ if (e.key === 'Escape') closeModal(false); }

            async function openModal(){
              show();
              // Make phone Back close modal first
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
                // fail gracefully
                closeModal(true);
                console.error(e);
              }
            }

            function closeModal(fromPop){
              hide();
              // Consume our history entry so the next Back won't leave the site
              if (pushed && !fromPop) { try { history.back(); } catch(e) {} }
              pushed = false;
            }

            function onPopState(){
              // If open, close instead of navigating away
              if (backdrop.style.display !== 'none') {
                closeModal(true);
                // re-arm for future opens
                setTimeout(function(){ window.addEventListener('popstate', onPopState, { once: true }); }, 0);
              }
            }

            // INSTANT outside-close on mobile:
            // use 'touchstart' for phones and 'mousedown' for desktops; close only if the tap/click is on the backdrop itself.
            backdrop.addEventListener('touchstart', function(e){
              if (e.target === backdrop) closeModal(false);
            }, { passive: true });
            backdrop.addEventListener('mousedown', function(e){
              if (e.target === backdrop) closeModal(false);
            });
            // Also support a normal click (some browsers synthesize click after touch)
            backdrop.addEventListener('click', function(e){
              if (e.target === backdrop) closeModal(false);
            });

            // Expose globals for the Buy button
            window.__openJupModal = openModal;
            window.__closeJupModal = closeModal;

            // Re-center on orientation change (flex does this already; force layout anyway)
            window.addEventListener('orientationchange', function(){
              if (backdrop.style.display !== 'none') {
                // trigger reflow
                backdrop.style.display = 'flex';
              }
            });
          })();
        `}</Script>
      </body>
    </html>
  );
}
