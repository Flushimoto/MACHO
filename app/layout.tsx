import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { JupiterProvider } from "./components/JupiterProvider";
import { Toaster } from "./components/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://macho.meme";
const title = "Macho Coin ($MACHO) | The Right-Hook Dog";
const description = "Macho Coin ($MACHO) is the new top dog on Solana. Inspired by the legendary Right-Hook Dog meme, it's all about strength, community, and pure macho energy. Get your paws on $MACHO now.";

export const metadata: Metadata = {
  title: title,
  description: description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    url: siteUrl,
    title: title,
    description: description,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Macho Coin ($MACHO) on Solana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
