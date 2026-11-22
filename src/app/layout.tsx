import "@/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { NavigationLoaderProvider } from "@/components/navigation-loader";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Commute Count",
  description: "Commute Count description",
  icons: [{ rel: "icon", url: "/oil.png" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className} antialiased scroll-smooth`}>
      <body>
        <NavigationLoaderProvider>
          <TRPCReactProvider>
            {children}
          </TRPCReactProvider>
        </NavigationLoaderProvider>
      </body>
    </html>
  );
}
