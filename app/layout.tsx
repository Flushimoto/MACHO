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

        {/* Backdrop = the only outside area; centers the mount */}
        <div
          id="jup-backdrop"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "none",      // set to 'flex' when open
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            background: "rgba(0,0,0,.55)",
            backdropFilter: "blur(2px)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {/* The ONLY child Jupiter is allowed to use */}
          <div
            id="jup-mount"
            style={{
              width: "min(95vw, 560px)",
              height: "min(90svh, 720px)",
              borderRadius: "10px",
              overflow: "hidden",
              background: "transparent",
              margin: 0,
              padding: 0,
              border: 0,
            }}
          />
        </div>

        {/* Controller: purge leftovers, clamp Jupiter container, coordinate-based outside-close */}
        <Script id="jup-controller" strategy="afterInteractive">{`
          (function () {
            window.__PROJECT_TOKEN_MINT__ = "GJZJsDnJaqGuGxgARRYNhzBWEzfST4sngHKLP2nppump";
            var backdrop = document.getElementById('jup-backdrop');
            var mount    = document.getElementById('jup-mount');
            var pushed   = false;
            var closing  = false;

            function lockScroll(lock){
              document.documentElement.style.overflow = lock ? 'hidden' : '';
              document.body.style.overflow = lock ? 'hidden' : '';
              document.body.style.touchAction = lock ? 'none' : '';
            }

            // Remove any stale overlays/boxes left from previous versions
            function purgeOldOverlays(){
              // Kill known legacy IDs if present
              var old = document.getElementById('jup-modal'); if (old && old.parentNode) old.parentNode.removeChild(old);
              var old2 = document.getElementById('jupiter-plugin'); if (old2 && old2.parentNode) old2.parentNode.removeChild(old2);
              // Ensure backdrop has ONLY the mount
              Array.from(backdrop.children).forEach(function(node){
                if (node !== mount) node.parentNode && node.parentNode.removeChild(node);
              });
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

            // After Jupiter injects, clamp its internal container to EXACTLY the mount size
            function clampJupiterBox(){
              try {
                // Jupiter injects a wrapper inside our mount; make it fit 100%
                var container = mount.firstElementChild;
                if (container && container !== mount) {
                  var s = container.style;
                  s.width = "100%"; s.height = "100%";
                  s.margin = "0"; s.padding = "0"; s.border = "0";
                  s.borderRadius = "10px"; s.overflow = "hidden";
                  // If it has any siblings/padding boxes, remove them
                  Array.from(mount.children).forEach(function(el){ if (el !== container) el.remove(); });
                }
                // If an iframe exists, make sure it fills the box
                var iframe = mount.querySelector('iframe');
                if (iframe) {
                  var fi = iframe.style;
                  fi.width = "100%"; fi.height = "100%";
                  fi.border = "0"; fi.margin = "0"; fi.padding = "0";
                }
              } catch (e) { /* ignore */ }
            }

            function getWidgetRect(){
              // Prefer iframe bounds (actual interactive surface), else mount bounds
              var iframe = mount.querySelector('iframe');
              var el = iframe || mount;
              return el.getBoundingClientRect();
            }

            function isPointInsideRect(x,y,r){ return x>=r.left && x<=r.right && y>=r.top && y<=r.bottom; }

            function outsideClose(ev){
              // Close if pointer is OUTSIDE the widget rect
              var r = getWidgetRect();
              var p = ('touches' in ev && ev.touches && ev.touches[0]) ? ev.touches[0] : ev;
              if (!isPointInsideRect(p.clientX, p.clientY, r)) {
                ev.preventDefault && ev.preventDefault();
                ev.stopPropagation && ev.stopPropagation();
                closeModal(false);
              }
            }

            async function openModal(){
              closing = false;
              purgeOldOverlays();   // <- nuke any ghost boxes first
              show();

              // Back button should close modal first
              if (!pushed) {
                try { history.pushState({ jupOpen: true }, "", location.href); } catch(e) {}
                pushed = true;
                window.addEventListener('popstate', onPopState, { once: true });
              }

              // Capture listeners ensure near-edge taps close instantly, even if some ghost layer exists
              document.addEventListener('pointerdown', outsideClose, true);
              document.addEventListener('touchstart',  outsideClose, { capture: true, passive: true });
              document.addEventListener('mousedown',   outsideClose, true);

              try {
                await ensureJupiterLoaded();
                if (!window.__JUP_INIT__) {
                  window.__JUP_INIT__ = true;
                  window.Jupiter.init({
                    displayMode: "integrated",
                    integratedTargetId: "jup-mount",
                    formProps: { initialOutputMint: window.__PROJECT_TOKEN_MINT__ },
                    // Ask nicely for tight container (some builds honor this)
                    containerStyles: {
                      width: "100%", height: "100%", margin: "0", padding: "0",
                      borderRadius: "10px", overflow: "hidden"
                    },
                    containerClassName: ""
                  });
                } else {
                  try { window.Jupiter.resume && window.Jupiter.resume(); } catch(e) {}
                }
                // Force clamp even if Jupiter adds extra wrappers
                clampJupiterBox();
              } catch (e) {
                closeModal(true);
                console.error(e);
              }
            }

            function closeModal(fromPop){
              if (closing) return;
              closing = true;

              // Remove outside listeners first so we don't get a second trigger
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
              if (backdrop.style.display !== 'none') {
                closeModal(true);
                setTimeout(function(){ window.addEventListener('popstate', onPopState, { once: true }); }, 0);
              }
            }

            // Also close if the user taps the dim area explicitly
            backdrop.addEventListener('click', function(e){
              // Use coordinates to ignore any invisible overlays between backdrop and widget
              var r = getWidgetRect();
              if (!isPointInsideRect(e.clientX, e.clientY, r)) closeModal(false);
            });

            // Public API for the Buy button
            window.__openJupModal  = openModal;
            window.__closeJupModal = closeModal;

            // Keep centered across orientation changes (flex already centers)
            window.addEventListener('orientationchange', function(){
              if (backdrop.style.display !== 'none') backdrop.style.display = 'flex';
            });
          })();
        `}</Script>
      </body>
    </html>
  );
}
