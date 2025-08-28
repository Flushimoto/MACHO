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

        {/* Backdrop = only outside click area; flex centers the widget */}
        <div
          id="jup-backdrop"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "none",         // set to 'flex' when open
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            background: "rgba(0,0,0,.55)",
            backdropFilter: "blur(2px)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {/* Mount: this is the ONLY box Jupiter is allowed to fill. */}
          <div
            id="jup-mount"
            style={{
              width: "min(95vw, 560px)",
              height: "min(90svh, 720px)",
              margin: 0,
              padding: 0,
              border: 0,
              borderRadius: "10px",
              overflow: "hidden",
              background: "transparent",
              pointerEvents: "auto",
            }}
          />
        </div>

        {/* Controller — pure JS; no capture tricks, just backdrop click and back-button */}
        <Script id="jup-controller" strategy="afterInteractive">{`
          (function () {
            // Your output token mint
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

            async function openModal(){
              show();

              // Phone Back closes the modal first
              if (!pushed) {
                try { history.pushState({ jupOpen: true }, "", location.href); } catch(e) {}
                pushed = true;
                window.addEventListener('popstate', onPopState, { once: true });
              }

              try {
                await ensureJupiterLoaded();
                if (!window.__JUP_INIT__) {
                  window.__JUP_INIT__ = true;

                  // KEY FIX: force Jupiter's internal container to match the mount exactly.
                  // That removes the invisible hitbox around the widget.
                  window.Jupiter.init({
                    displayMode: "integrated",
                    integratedTargetId: "jup-mount",
                    formProps: {
                      initialOutputMint: window.__PROJECT_TOKEN_MINT__,
                    },
                    // This makes the plugin's own container width/height = 100% of #jup-mount.
                    containerStyles: {
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                      overflow: "hidden",
                      margin: "0",
                      padding: "0",
                    },
                    // Safety belt: no external class padding.
                    containerClassName: ""
                  });
                } else {
                  // If already initialized, just ensure it resumes
                  try { window.Jupiter.resume?.(); } catch(e) {}
                }
              } catch (e) {
                closeModal(true);
                console.error(e);
              }
            }

            function closeModal(fromPop){
              hide();
              if (pushed && !fromPop) { try { history.back(); } catch(e) {} }
              pushed = false;
              try { window.Jupiter.close?.(); } catch(e) {}
            }

            function onPopState(){
              if (backdrop.style.display !== 'none') {
                closeModal(true);
                setTimeout(function(){ window.addEventListener('popstate', onPopState, { once: true }); }, 0);
              }
            }

            // Close ONLY when backdrop itself is tapped/clicked (1px outside the widget)
            backdrop.addEventListener('mousedown', function(e){ if (e.target === backdrop) closeModal(false); });
            backdrop.addEventListener('touchstart', function(e){ if (e.target === backdrop) closeModal(false); }, { passive: true });
            backdrop.addEventListener('click', function(e){ if (e.target === backdrop) closeModal(false); });

            // Public API for Buy buttons
            window.__openJupModal  = openModal;
            window.__closeJupModal = closeModal;

            // Keep centered across orientation changes (flex already centers)
            window.addEventListener('orientationchange', function(){
              if (backdrop.style.display !== 'none') { backdrop.style.display = 'flex'; }
            });
          })();
        `}</Script>
      </body>
    </html>
  );
}
