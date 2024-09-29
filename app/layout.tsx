import type { Metadata } from "next";
import localFont from "next/font/local";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/queryProvider";
import SheetProvider from "@/providers/sheetProvider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Personal finance tracker",
  description: "A one-stop solution to keep your financial health in leash.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.svg" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <QueryProvider>
            <SheetProvider>
              <Toaster />
              {children}
            </SheetProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
