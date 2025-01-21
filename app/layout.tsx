import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import OverflowHandler from "@/components/OverflowHandler";

const inter = Inter({ subsets: ["latin"] });

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
        </Provider>
      </OverflowHandler>
    </html>
  );
}
