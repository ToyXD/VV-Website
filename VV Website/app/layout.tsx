import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Versatile Vision | Wear Your Fandom",
  description:
    "Premium anime and gaming merchandise, original streetwear, collectibles, and limited drops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
