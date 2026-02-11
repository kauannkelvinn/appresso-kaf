import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-headlines",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Appresso Kafe",
  description: "Simplificando sua rotina com IA",
  icons: { icon: "/logo.ico" }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="bg-background text-foreground selection:bg-kaf-primary selection:text-background">
      <body className={`${instrumentSans.variable} ${jetBrainsMono.variable} antialiased min-h-screen border-t-2 border-kaf-red`}>
        {children}
      </body>
    </html>
  );
}