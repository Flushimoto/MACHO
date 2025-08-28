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

        {/* Backdrop: only outside area. Stronger blur. */}
        <div
          id="jup-backdrop"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "none",               // set to 'flex' when open
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2147483646,
            background: "rgba(0,0,0,.68)",
            backdropFilter: "blur(8px)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {/* Mount: the single place Jupiter renders into */}
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
              position: "relative",
            }}
          />
        </div>

        {/* Controller — remove wrapper hitboxes, center, instant outside-close, back-button safe */}
        <Script id="jup-controller" strategy="afterInteractive">{`
          (function () {
            // Token
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

            // ---- core fix: neutralize wrapper boxes so only the iframe has a hitbox
            function stripWrapperBoxes(){
              try {
                // walk down from mount until iframe
                var node = mount.firstElementChild;
                var wrappers = [];
                while (node && node.tagName !== 'IFRAME' && wrappers.length < 6) {
                  wrappers.push(node);
                  node = node.firstElementChild;
                }
                // make wrappers "boxless" so they don't intercept clicks
                wrappers.forEach(function(w){
                  var s = w.style;
                  s.display = 'contents';        // removes the box
                  s.pointerEvents = 'none';      // can't catch hits
                  s.width = 'auto';
                  s.height = 'auto';
                  s.margin = '0';
                  s.padding = '0';
                  s.border = '0';
                  s.maxWidth = 'none';
                  s.maxHeight = 'none';
                });

                // ensure iframe fills mount exactly
                var iframe = mount.querySelector('iframe');
                if (iframe) {
                  var si = iframe.style;
                  si.width = '100%';
                  si.height = '100%';
                  si.display = 'block';
                  si.border = '0';
                  si.margin = '0';
                  si.padding = '0';
                }
              } catch (e) { /* ignore */ }
            }

            function getWidgetRect(){
              var iframe = mount.querySelector('iframe');
              var el = iframe || mount;
              return el.getBoundingClientRect();
            }

            function outsideCloseCapture(ev){
              // If down happens outside the actual widget rect, close immediately
              var r = getWidgetRect();
              var p = ('touches' in ev && ev.touches && ev.touches[0]) ? ev.touches[0] : ev;
              var inside = p.clientX >= r.left && p.clientX <= r.right && p.clientY >= r.top && p.clientY <= r.bottom;
              if (!inside) { ev.preventDefault && ev.preventDefault(); ev.stopPropagation && ev.stopPropagation(); closeModal(false); }
            }

            async function openModal(){
              show();

              // trap back button so it closes the modal first
              if (!pushed) {
                try { history.pushState({ jupOpen: true }, "", location.href); } catch(e) {}
                pushed = true;
                window.addEventListener('popstate', onPopState, { once: true });
              }

              // capture outside clicks/taps immediately (works on mobile)
              document.addEventListener('pointerdown', outsideCloseCapture, true);
              document.addEventListener('touchstart',  outsideCloseCapture, { capture: true, passive: true });
              document.addEventListener('mousedown',   outsideCloseCapture, true);

              try {
                await ensureJupiterLoaded();
                if (!window.__JUP_INIT__) {
                  window.__JUP_INIT__ = true;
                  window.Jupiter.init({
                    displayMode: "integrated",
                    integratedTargetId: "jup-mount",
                    formProps: { initialOutputMint: window.__PROJECT_TOKEN_MINT__ },
                    containerStyles: { width: "100%", height: "100%", margin: "0", padding: "0", borderRadius: "10px", overflow: "hidden" },
                    containerClassName: ""
                  });
                } else {
                  try { window.Jupiter.resume && window.Jupiter.resume(); } catch(e) {}
                }
                // after inject, strip wrappers so they can't catch hits
                setTimeout(stripWrapperBoxes, 0);
              } catch (e) {
                closeModal(true);
                console.error(e);
              }
            }

            function closeModal(fromPop){
              // remove capture listeners first
              document.removeEventListener('pointerdown', outsideCloseCapture, true);
              document.removeEventListener('touchstart',  outsideCloseCapture, true);
              document.removeEventListener('mousedown',   outsideCloseCapture, true);

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

            // Explicit backdrop close (redundant with capture, but harmless)
            backdrop.addEventListener('click', function(e){
              var r = getWidgetRect();
              if (!(e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom)) closeModal(false);
            });

            // Public API
            window.__openJupModal  = openModal;
            window.__closeJupModal = closeModal;

            // keep centered on orientation changes
            window.addEventListener('orientationchange', function(){
              if (backdrop.style.display !== 'none') backdrop.style.display = 'flex';
            });
          })();
        `}</Script>
      </body>
    </html>
  );
}
