import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import OverflowHandler from "@/components/OverflowHandler";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Liftpulse",
  description: "O melhor site para gerenciar sua academia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <OverflowHandler>
        <Provider>
          {children}
          <SpeedInsights />
        </Provider>
      </OverflowHandler>
    </html>
  );
}
