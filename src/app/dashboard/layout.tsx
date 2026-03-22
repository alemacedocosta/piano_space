"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", icon: "🏠", label: "Início" },
  { href: "/dashboard/escalas", icon: "🎵", label: "Escalas" },
  { href: "/dashboard/acordes", icon: "🎹", label: "Acordes" },
  { href: "/dashboard/ciclo-das-quintas", icon: "⭕", label: "Ciclo das quintas" },
  { href: "/dashboard/progressoes", icon: "🎶", label: "Progressões" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-sand-light">
      {/* Sidebar */}
      <aside className="w-64 bg-navy flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">🎹</span>
            <span className="font-bold text-white text-base">Piano space</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
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
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left px-3 py-2 text-white/60 hover:text-white text-sm rounded-lg hover:bg-white/10 transition-colors"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
