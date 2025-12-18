"use client";

console.log("Header component loaded");

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  console.log("🟡 SESSION STATUS:", status);
  console.log("🟡 SESSION DATA:", session);

  return (
    <header className="dashboard-header">
      <h1 className="app-title">💸 Harcama Takip</h1>

      <div className="user-area" style={{ display: "flex", gap: "1rem" }}>
        {status === "loading" && <span>Yükleniyor...</span>}

        {!session && status !== "loading" && (
          <>
            <Link
              href="/login"
              style={{
                textDecoration: "none",
                padding: "0.5rem 1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              Giriş Yap
            </Link>

            <Link
              href="/register"
              style={{
                textDecoration: "none",
                padding: "0.5rem 1rem",
                backgroundColor: "#0070f3",
                color: "#fff",
                borderRadius: "4px",
              }}
            >
              Kayıt Ol
            </Link>
          </>
        )}

        {session && (
          <>
            <span>{session.user?.email}</span>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              style={{
                padding: "0.5rem 1rem",
                border: "none",
                backgroundColor: "#e00",
                color: "#fff",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Çıkış Yap
            </button>
          </>
        )}
      </div>
    </header>
  );
}