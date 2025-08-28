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

        {/* Jupiter plugin script */}
        <Script src="https://plugin.jup.ag/plugin-v1.js" strategy="afterInteractive" data-preload />

        {/* Backdrop fills the viewport and centers children */}
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
          {/* Shell centers the mount but DOES NOT catch clicks */}
          <div
            id="jup-shell"
            style={{
              pointerEvents: "none",     // << key: shell is transparent to clicks
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Only this mount receives pointer events */}
            <div
              id="jup-mount"
              style={{
                pointerEvents: "auto",    // << key: widget remains fully interactive
                width: "min(95vw, 560px)",
                height: "min(90svh, 720px)",
                borderRadius: "10px",
                overflow: "hidden",
                background: "transparent",
              }}
            />
          </div>
        </div>

        {/* Controller (pure JS) */}
        <Script id="jup-controller" strategy="afterInteractive">{`
          (function () {
            // Your token mint
            window.__PROJECT_TOKEN_MINT__ = "GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";

            var backdrop = document.getElementById('jup-backdrop');
            var shell    = document.getElementById('jup-shell');
            var mount    = document.getElementById('jup-mount');
            var pushed   = false;   // did we push history while open?

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
              backdrop.style.display = 'flex';   // flex centers the shell/mount
              lockScroll(true);
            }
            function hide(){
              backdrop.style.display = 'none';
              lockScroll(false);
            }

            async function openModal(){
              show();

              // Phone Back should close modal first
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
                    integratedTargetId: "jup-mount", // << mount id here
                    formProps: { initialOutputMint: window.__PROJECT_TOKEN_MINT__ }
                  });
                }
              } catch (e) {
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

            // Close if you tap/click the backdrop (ANYWHERE outside the mount)
            // Shell has pointer-events: none, so near-edge taps fall through to backdrop.
            backdrop.addEventListener('click', function(e){
              if (e.target === backdrop) closeModal(false);
            });
            backdrop.addEventListener('touchstart', function(e){
              if (e.target === backdrop) closeModal(false);
            }, { passive: true });

            // Public API for the Buy button
            window.__openJupModal  = openModal;
            window.__closeJupModal = closeModal;

            // Keep centered across orientation changes
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
