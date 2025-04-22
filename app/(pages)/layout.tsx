import type { Metadata } from "next";
import "./globals.css";
import { Red_Hat_Display, Jaro } from "next/font/google";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${redHatDisplay.className} bg-background-primary text-content-body  antialiased h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
