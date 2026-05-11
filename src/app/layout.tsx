import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SAARZ Int. | Innovative Digital Solutions",
  description:
    "Empowering businesses with cutting-edge technology, design and strategy. Web Development, Mobile Apps, AI Solutions, Cloud Infrastructure.",
  keywords:
    "web development, mobile apps, AI solutions, cloud infrastructure, digital agency, SAARZ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libreFranklin.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
