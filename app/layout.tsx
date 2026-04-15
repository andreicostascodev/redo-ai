import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Redo.Ai — AI Marketing Content Generator",
  description:
    "Turn any product into high-converting marketing content. Get ad copies, product descriptions, social posts, and brand slogans in seconds.",
  keywords: [
    "AI marketing",
    "content generator",
    "ad copy",
    "product description",
    "social media",
    "e-commerce",
    "copywriting AI",
  ],
  openGraph: {
    title: "Redo.Ai — AI Marketing Content Generator",
    description:
      "Turn any product into marketing gold. Ad copies, descriptions, social posts, and slogans — all in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0d] text-white antialiased noise-overlay">
        {children}
      </body>
    </html>
  );
}
