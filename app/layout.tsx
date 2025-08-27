import type { Metadata } from "next";
import "./globals.css";
import JupiterProvider from "./providers/JupiterProvider";

export const metadata: Metadata = {
  title: "Macho Coin ($MACHO)",
  description: "The official MACHO website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <script src="https://terminal.jup.ag/main-v2.js"></script>
      </head>
      <body className="font-sans">
        <JupiterProvider />
        {children}
      </body>
    </html>
  );
}
