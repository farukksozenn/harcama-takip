import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="dashboard-layout">
          
          <header className="dashboard-header">
            <h1 className="app-title">💸 Harcama Takip</h1>
            <div className="user-area">
            </div>
          </header>

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
      </body>
    </html>
  );
}