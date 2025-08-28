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

        {/* Backdrop centers children; nothing else between backdrop and mount */}
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
          {/* The Jupiter mount. We force it to be the exact intended size. */}
          <div
            id="jup-mount"
            style={{
              width: "min(95vw, 560px)",
              height: "min(90svh, 720px)",
              margin: 0,
              padding: 0,
              border: 0,
              background: "transparent",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          />
        </div>

        {/* Controller (pure JS; coordinate-based outside-close) */}
        <Script id="jup-controller" strategy="afterInteractive">{`
          (function () {
            // Token mint
            window.__PROJECT_TOKEN_MINT__ = "GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

            var backdrop = document.getElementById('jup-backdrop');
            var mount    = document.getElementById('jup-mount');
            var pushed   = false;

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

            function show(){ backdrop.style.display = 'flex'; lockScroll(true); }
            function hide(){ backdrop.style.display = 'none'; lockScroll(false); }

            function getWidgetRect(){
              // Prefer the iframe Jupiter injects; fall back to mount box.
              var iframe = mount.querySelector('iframe');
              var el = iframe || mount;
              return el.getBoundingClientRect();
            }

            function isPointInsideRect(clientX, clientY, rect){
              return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
            }

            function outsideCloseHandler(ev){
              // Close if the pointer is OUTSIDE the widget's actual rect (iframe if present)
              var rect = getWidgetRect();
              var pt = ('touches' in ev && ev.touches && ev.touches[0]) ? ev.touches[0] : ev;
              var inside = isPointInsideRect(pt.clientX, pt.clientY, rect);
              if (!inside) closeModal(false);
            }

            async function openModal(){
              show();

              // Phone Back should close modal first
              if (!pushed) {
                try { history.pushState({ jupOpen: true }, "", location.href); } catch(e) {}
                pushed = true;
                window.addEventListener('popstate', onPopState, { once: true });
              }

              // Start capture listeners so "near-edge" taps close instantly
              document.addEventListener('pointerdown', outsideCloseHandler, true);
              document.addEventListener('touchstart',  outsideCloseHandler, { capture: true, passive: true });
              document.addEventListener('mousedown',   outsideCloseHandler, true);

              try {
                await ensureJupiterLoaded();
                if (!window.__JUP_INIT__) {
                  window.__JUP_INIT__ = true;
                  window.Jupiter.init({
                    displayMode: "integrated",
                    integratedTargetId: "jup-mount",
                    formProps: { initialOutputMint: window.__PROJECT_TOKEN_MINT__ }
                  });
                }
              } catch (e) {
                closeModal(true); // fail gracefully
                console.error(e);
              }
            }

            function closeModal(fromPop){
              // Remove listeners first so the close is immediate and final
              document.removeEventListener('pointerdown', outsideCloseHandler, true);
              document.removeEventListener('touchstart',  outsideCloseHandler, true);
              document.removeEventListener('mousedown',   outsideCloseHandler, true);

              hide();

              // Consume our history entry so the next Back won't leave the site
              if (pushed && !fromPop) { try { history.back(); } catch(e) {} }
              pushed = false;
            }

            function onPopState(){
              if (backdrop.style.display !== 'none') {
                closeModal(true);
                setTimeout(function(){ window.addEventListener('popstate', onPopState, { once: true }); }, 0);
              }
            }

            // Also close if user taps the dim area explicitly
            backdrop.addEventListener('click', function(e){
              // If a synthetic click fires after touchstart, this is harmless.
              var rect = getWidgetRect();
              var inside = isPointInsideRect(e.clientX, e.clientY, rect);
              if (!inside) closeModal(false);
            });

            // Public API for the Buy button
            window.__openJupModal  = openModal;
            window.__closeJupModal = closeModal;

            // Keep layout stable across orientation changes (flex keeps it centered)
            window.addEventListener('orientationchange', function(){
              if (backdrop.style.display !== 'none') backdrop.style.display = 'flex';
            });
          })();
        `}</Script>
      </body>
    </html>
  );
}
