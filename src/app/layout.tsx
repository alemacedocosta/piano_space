import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Piano space — Piano no seu tempo na palma da sua mão",
  description: "Toque com a ajuda de um assistente na hora que você quiser. Escalas, acordes, modos e progressões de forma interativa.",
  keywords: ["piano", "aprender piano", "escalas musicais", "teoria musical", "acordes"],
  openGraph: {
    title: "Piano space",
    description: "Piano no seu tempo na palma da sua mão",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
