import type { Metadata } from "next";
import "./globals.css";
import JupiterProvider from "./providers/JupiterProvider";

export const metadata: Metadata = {
  title: "Macho Coin",
  description: "The official MACHO website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Load Jupiter modal script */}
        <script src="https://terminal.jup.ag/main-v2.js"></script>
      </head>
      <body>
        {/* Global Jupiter modal provider */}
        <JupiterProvider />
        {children}
      </body>
    </html>
  );
}
