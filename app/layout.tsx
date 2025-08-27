// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { JupiterProvider } from "./components/JupiterProvider";
import { Toaster } from "./components/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

// Optional: set these if you want OG tags now
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://macho.example";
const TITLE = "Macho Coin ($MACHO) — The Right-Hook Dog";
const DESC = "Macho Coin ($MACHO) brings unapologetic meme energy to Solana. Community, velocity, and a knockout narrative.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "/",
    siteName: "Macho Coin",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={inter.className}>
        <JupiterProvider>
          {children}
          <Toaster />
        </JupiterProvider>
      </body>
    </html>
  );
}
