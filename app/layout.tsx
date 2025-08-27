import type { Metadata } from "next";
import "./globals.css";
import JupiterProvider from "./providers/JupiterProvider";

export const metadata: Metadata = {
  title: "Macho Coin",
  description: "Macho Coin Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JupiterProvider>{children}</JupiterProvider>
      </body>
    </html>
  );
}
