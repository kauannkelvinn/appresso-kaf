import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const khTeka = localFont({
  src: [
    { path: "../../public/fonts/khmedium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/khbold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/khblack.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-kh-teka",
  display: "swap",
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Appresso Kaf | Life OS",
  description: "Simplificando sua rotina com IA e Design de Alta Perfomanc e",
  icons: { icon: "/logo.ico" }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="selection:bg-brand-blue selection:text-white">
      <body
       className={`
        ${khTeka.variable} 
        ${jetBrainsMono.variable} 
        antialiased 
        min-h-screen 
        bg-brand-bg 
        text-brand-black
        font-display
        `}
       >
        <main className="max-w-[1440px] mx-auto px-8 py-12">
        {children}
        </main>
      </body>
    </html>
  );
}