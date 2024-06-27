import type { Metadata } from "next";
import {inter} from '@/app/ui/fonts'
import "./globals.css";

export const metadata: Metadata = {
  title: "Jot",
  description: "Quick notes and key thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
