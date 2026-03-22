import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Piano space — Aprenda teoria musical de verdade",
  description: "Escalas, acordes, ciclo das quintas e progressões harmônicas de forma interativa e didática.",
  keywords: ["teoria musical", "escalas musicais", "acordes", "ciclo das quintas", "piano"],
  openGraph: {
    title: "Piano space",
    description: "Aprenda teoria musical de verdade",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
