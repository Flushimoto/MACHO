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

        {/* ---------- Jupiter plugin ---------- */}
        <Script src="https://plugin.jup.ag/plugin-v1.js" strategy="afterInteractive" data-preload />

        {/* ---------- Scoped CSS: neutralize every non-iframe wrapper inside #jup-mount ---------- */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
/* 1) Only touch inside our mount; leave the rest of the site alone */
#jup-mount, #jup-mount * { box-sizing: border-box; }

/* 2) Make all non-iframe layers boxless + click-through so they can't steal edge clicks */
#jup-mount :not(iframe) {
  display: contents !important;
  pointer-events: none !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  max-width: none !important;
  max-height: none !important;
}

/* 3) The iframe is the only interactive surface; make it fill the mount exactly */
#jup-mount > iframe {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  border: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  pointer-events: auto !important;
}
            `.trim(),
          }}
        />

        {/* ---------- Backdrop (single outer layer) ---------- */}
        <div
          id="jup-backdrop"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "none",             // set to 'flex' when open
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2147483000,          // stays above everything
            background: "rgba(0,0,0,0.68)",
            backdropFilter: "blur(10px)", // stronger blur per your ask
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {/* The ONLY place Jupiter may render into */}
          <div
            id="jup-mount"
            style={{
              width: "min(95vw, 560px)",
              height: "clamp(430px, 60svh, 640px)", // <= compact height
              borderRadius: "10px",
              overflow: "hidden",
              background: "transparent",
              position: "relative",
            }}
          />
        </div>

        {/* ---------- Controller (pure JS) ---------- */}
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

  // MutationObserver: keep wrappers boxless/click-through even if Jupiter injects later
  var mo = null;
  function startObserver(){
    try {
      if (mo) mo.disconnect();
      mo = new MutationObserver(function(){
        // nothing needed here because CSS already forces wrappers -> contents/none
        // we just keep the observer active so late inserts follow the CSS rules
      });
      mo.observe(mount, { childList: true, subtree: true });
    } catch(e) {}
  }
  function stopObserver(){ try { mo && mo.disconnect(); } catch(e) {} }

  async function openModal(){
    show(); startObserver();

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
          integratedTargetId: "jup-mount",
          formProps: { initialOutputMint: window.__PROJECT_TOKEN_MINT__ },
          containerStyles: { width: "100%", height: "100%", margin: "0", padding: "0", borderRadius: "10px", overflow: "hidden" },
          containerClassName: ""
        });
      } else {
        try { window.Jupiter.resume && window.Jupiter.resume(); } catch(e) {}
      }
    } catch (e) {
      closeModal(true);
      console.error(e);
    }
  }

  function closeModal(fromPop){
    stopObserver();
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

  // Backdrop closes on any tap/click (since all inner wrappers are click-through now)
  backdrop.addEventListener('mousedown', function(e){ if (e.target === backdrop) closeModal(false); });
  backdrop.addEventListener('touchstart', function(e){ if (e.target === backdrop) closeModal(false); }, { passive: true });
  backdrop.addEventListener('click', function(e){ if (e.target === backdrop) closeModal(false); });

  // Public API
  window.__openJupModal  = openModal;
  window.__closeJupModal = closeModal;

  // Keep centered across orientation changes
  window.addEventListener('orientationchange', function(){
    if (backdrop.style.display !== 'none') backdrop.style.display = 'flex';
  });
})();
        `}</Script>
      </body>
    </html>
  );
}
