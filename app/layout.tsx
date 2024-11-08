import { StackProvider, StackTheme } from "@stackframe/stack";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { stackServerApp } from "../stack";
import "./globals.css";
import { Provider } from "./provider";

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
      <body className={inter.className}>
        <Provider>
          <StackProvider app={stackServerApp}>
            <StackTheme>{children}</StackTheme>
          </StackProvider>
        </Provider>
      </body>
    </html>
  );
}
