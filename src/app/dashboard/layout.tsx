"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const ADMIN_EMAIL = "alemacedo@gmail.com";
const TRIAL_DAYS = 7;

const nav = [
  { href: "/dashboard", icon: "🏠", label: "Início" },
  { href: "/dashboard/escalas", icon: "🎵", label: "Escalas" },
  { href: "/dashboard/acordes", icon: "🎹", label: "Acordes" },
  { href: "/dashboard/ciclo-das-quintas", icon: "⭕", label: "Ciclo das quintas" },
  { href: "/dashboard/progressoes", icon: "🎶", label: "Progressões" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Verificação de trial ───────────────────────────────────────────────────
  useEffect(() => {
    if (status !== "authenticated" || !session?.user) return;

    // Admin está sempre isento
    if (session.user.email === ADMIN_EMAIL) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = session.user as any;
    const createdAt: string | undefined = user.createdAt;
    const paidAt: string | null = user.paidAt ?? null;

    if (paidAt) return; // já pagou, acesso liberado

    if (createdAt) {
      const msPerDay = 1000 * 60 * 60 * 24;
      const daysSince = (Date.now() - new Date(createdAt).getTime()) / msPerDay;
      if (daysSince > TRIAL_DAYS) {
        router.replace("/assinar");
      }
    }
  }, [session, status, router]);

  const sidebarContent = (
    <>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className="px-3 py-2 mb-2">
          <p className="text-white text-sm font-medium truncate">{session?.user?.name}</p>
          <p className="text-white/50 text-xs truncate">{session?.user?.email}</p>
        </div>

        {session?.user?.email === ADMIN_EMAIL && (
          <Link
            href="/dashboard/admin"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 ${
              pathname === "/dashboard/admin"
                ? "bg-primary text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <span className="text-base">⚙️</span>
            Gestão de usuários
          </Link>
        )}

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full text-left px-3 py-2 text-white/60 hover:text-white text-sm rounded-lg hover:bg-white/10 transition-colors"
        >
          Sair
        </button>
      </div>
    </>
  );

  return (
    <div className="h-screen flex bg-sand-light overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-navy flex-col flex-shrink-0 sticky top-0 h-screen">
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">🎹</span>
            <span className="font-bold text-white text-base">Piano space</span>
          </Link>
        </div>
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-navy flex flex-col z-50 transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">🎹</span>
            <span className="font-bold text-white text-base">Piano space</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white/60 hover:text-white p-1 text-lg leading-none"
            aria-label="Fechar menu"
          >
            ✕
          </button>
        </div>
        {sidebarContent}
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-navy sticky top-0 z-30 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-white/70 hover:text-white p-1"
            aria-label="Abrir menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🎹</span>
            <span className="font-bold text-white text-sm">Piano space</span>
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
