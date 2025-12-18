import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harcama Takip Dashboard",
  description: "Modern ve renkli harcama takip arayüzü",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="dashboard-layout">
            {/* ✅ SADECE BU HEADER */}
            <Header />

            <aside className="dashboard-sidebar">
              <nav>
                <ul>
                  <li>
                    <Link href="/">🏠 Ana Sayfa</Link>
                  </li>
                </ul>
              </nav>
            </aside>

            <main className="dashboard-content">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}