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
            WebkitTapHighlightColor: "transparent",
          }}
        />

        {/* Tight container around the widget, absolutely centered */}
        <div
          id="jup-modal"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(95vw, 560px)",
            height: "min(90dvh, 720px)", // dvh handles mobile browser UI changes well
            background: "transparent",
            borderRadius: "10px",
            overflow: "hidden",
            display: "none",
            zIndex: 10000,
            pointerEvents: "auto",
          }}
        >
          <div id="jup-title" style={{ position: "absolute", left: -9999 }}>Swap</div>
          <div id="jupiter-plugin" style={{ width: "100%", height: "100%" }} />
        </div>

        {/* Controller (pure JS; capture-phase outside-close; mobile-safe) */}
        <Script id="jup-controller" strategy="afterInteractive">{`
          (function () {
            window.__PROJECT_TOKEN_MINT__ = "GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

            var backdrop = document.getElementById('jup-backdrop');
            var modal    = document.getElementById('jup-modal');
            var pushed   = false;
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
              backdrop.style.display = 'block';
              modal.style.display    = 'block';
              lockScroll(true);
            }
            function hide(){
              modal.style.display    = 'none';
              backdrop.style.display = 'none';
              lockScroll(false);
            }

            // Capture-phase outside-close (works on iOS/Android even if inner layers stop bubbling)
            function outsideCloseHandler(ev){
              try {
                var path = ev.composedPath ? ev.composedPath() : [];
                var clickedInside = path.length ? path.indexOf(modal) !== -1 : modal.contains(ev.target);
                if (!clickedInside) closeModal(false);
              } catch(_) {
                if (!modal.contains(ev.target)) closeModal(false);
              }
            }

            async function openModal(){
              closing = false;
              show();

              // Phone back should close modal first
              if (!pushed) {
                try { history.pushState({ jupOpen: true }, "", location.href); } catch(e) {}
                pushed = true;
                window.addEventListener('popstate', onPopState, { once: true });
              }

              // Start capture listeners immediately for instant close on touch/click outside
              document.addEventListener('pointerdown', outsideCloseHandler, true);
              document.addEventListener('touchstart',  outsideCloseHandler, { capture: true, passive: true });
              document.addEventListener('mousedown',   outsideCloseHandler, true);

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
              document.removeEventListener('pointerdown', outsideCloseHandler, true);
              document.removeEventListener('touchstart',  outsideCloseHandler, true);
              document.removeEventListener('mousedown',   outsideCloseHandler, true);

              hide();

              // Consume our history entry so next Back won't leave the site
              if (pushed && !fromPop) { try { history.back(); } catch(e) {} }
              pushed = false;

              setTimeout(function(){ closing = false; }, 0);
            }

            function onPopState(){
              if (modal.style.display !== 'none') {
                closeModal(true);
                setTimeout(function(){ window.addEventListener('popstate', onPopState, { once: true }); }, 0);
              }
            }

            // Also close if the user taps the dim backdrop itself
            backdrop.addEventListener('click', function(e){
              if (e.target === backdrop) closeModal(false);
            });

            // Public API for your Buy button
            window.__openJupModal = openModal;
            window.__closeJupModal = closeModal;
          })();
        `}</Script>
      </body>
    </html>
  );
}
