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

        {/* Backdrop is the ONLY outer layer. It's a flex box that centers the widget. */}
        <div
          id="jup-backdrop"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "none",            // set to 'flex' when open
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            background: "rgba(0,0,0,.55)",
            backdropFilter: "blur(2px)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {/* The Jupiter mount itself (no extra wrapper = no invisible hitbox). */}
          <div
            id="jupiter-plugin"
            style={{
              width: "min(95vw, 560px)",
              height: "min(90svh, 720px)", // svh/dvh handles mobile browser UI shifts
              borderRadius: "10px",
              overflow: "hidden",
              background: "transparent",
            }}
          />
        </div>

        {/* Controller (pure JS) */}
        <Script id="jup-controller" strategy="afterInteractive">{`
          (function () {
            // Your token mint
            window.__PROJECT_TOKEN_MINT__ = "GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

            var backdrop = document.getElementById('jup-backdrop');
            var pluginEl = document.getElementById('jupiter-plugin');
            var pushed   = false;   // did we push history while open?
            var closing  = false;

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
              backdrop.style.display = 'flex';      // flex centers the pluginEl
              lockScroll(true);
            }
            function hide(){
              backdrop.style.display = 'none';
              lockScroll(false);
            }

            // Capture-phase outside-close: closes if the tap/click is NOT inside pluginEl
            function outsideClose(ev){
              try {
                var path = ev.composedPath ? ev.composedPath() : [];
                var inside = path.length ? path.indexOf(pluginEl) !== -1 : pluginEl.contains(ev.target);
                if (!inside) closeModal(false);
              } catch(_) {
                if (!pluginEl.contains(ev.target)) closeModal(false);
              }
            }

            async function openModal(){
              closing = false;
              show();

              // Phone Back should close modal first
              if (!pushed) {
                try { history.pushState({ jupOpen: true }, "", location.href); } catch(e) {}
                pushed = true;
                window.addEventListener('popstate', onPopState, { once: true });
              }

              // Start capture listeners immediately for instant close
              document.addEventListener('pointerdown', outsideClose, true);
              document.addEventListener('touchstart',  outsideClose, { capture: true, passive: true });
              document.addEventListener('mousedown',   outsideClose, true);

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
                closeModal(true); // fail gracefully
                console.error(e);
              }
            }

            function closeModal(fromPop){
              if (closing) return;
              closing = true;

              // Remove capture listeners first so the same tap doesn't re-trigger
              document.removeEventListener('pointerdown', outsideClose, true);
              document.removeEventListener('touchstart',  outsideClose, true);
              document.removeEventListener('mousedown',   outsideClose, true);

              hide();

              // Consume our history entry so the next Back won't leave the site
              if (pushed && !fromPop) { try { history.back(); } catch(e) {} }
              pushed = false;

              setTimeout(function(){ closing = false; }, 0);
            }

            function onPopState(){
              // If open, close instead of navigating away
              if (backdrop.style.display !== 'none') {
                closeModal(true);
                // re-arm for future opens
                setTimeout(function(){ window.addEventListener('popstate', onPopState, { once: true }); }, 0);
              }
            }

            // Also close if the user taps the dim backdrop itself
            backdrop.addEventListener('click', function(e){
              if (e.target === backdrop) closeModal(false);
            });

            // Public API for the Buy button
            window.__openJupModal  = openModal;
            window.__closeJupModal = closeModal;

            // Re-center on orientation change (flex already centers; this forces layout)
            window.addEventListener('orientationchange', function(){
              if (backdrop.style.display !== 'none') {
                backdrop.style.display = 'flex';
              }
            });
          })();
        `}</Script>
      </body>
    </html>
  );
}
