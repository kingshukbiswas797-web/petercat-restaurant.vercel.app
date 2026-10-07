import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peter Cat | A Kolkata Institution Since 1962",
  description: "Experience the legend of Peter Cat, Park Street, Kolkata. Home of the famous Chelo Kebab.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-peter-black text-peter-offwhite antialiased selection:bg-peter-gold selection:text-peter-black`}
      >
        {children}
      </body>
    </html>
  );
}
