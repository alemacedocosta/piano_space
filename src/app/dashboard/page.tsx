"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

const modules = [
  {
    href: "/dashboard/escalas",
    icon: "🎵",
    title: "Escalas musicais",
    desc: "Diatônicas, pentatônicas e modos gregos com visualização no teclado.",
    color: "border-primary/30 hover:border-primary",
    tag: "13 escalas",
  },
  {
    href: "/dashboard/acordes",
    icon: "🎹",
    title: "Dicionário de acordes",
    desc: "Formação, inversões e digitação dos principais acordes.",
    color: "border-accent/30 hover:border-accent",
    tag: "8 tipos",
  },
  {
    href: "/dashboard/ciclo-das-quintas",
    icon: "⭕",
    title: "Ciclo das quintas",
    desc: "Relações entre tonalidades e armaduras de clave.",
    color: "border-sand hover:border-sand-dark",
    tag: "12 tons",
  },
  {
    href: "/dashboard/progressoes",
    icon: "🎶",
    title: "Progressões (II-V-I)",
    desc: "As progressões mais usadas no jazz, MPB e música clássica.",
    color: "border-navy/20 hover:border-navy/50",
    tag: "12 tonalidades",
  },
];

export default function DashboardHome() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "Músico";

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      {/* Boas-vindas */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-navy mb-1">Olá, {firstName}! 👋</h1>
        <p className="text-navy/60 text-lg">Por onde você quer começar hoje?</p>
      </div>

      {/* Grid de módulos */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-navy/50 uppercase tracking-wider mb-4">Módulos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`bg-white rounded-2xl border-2 p-6 flex gap-4 items-start transition-all hover:shadow-md ${m.color}`}
            >
              <div className="w-12 h-12 rounded-xl bg-sand-light flex items-center justify-center text-2xl flex-shrink-0">
                {m.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-navy">{m.title}</h3>
                  <span className="text-xs bg-sand-light text-navy/60 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {m.tag}
                  </span>
                </div>
                <p className="text-navy/60 text-sm leading-relaxed">{m.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Dica rápida */}
      <section className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
        <h3 className="font-bold text-navy mb-2">💡 Dica para iniciantes</h3>
        <p className="text-navy/70 text-sm leading-relaxed">
          Comece pelas <strong>Escalas musicais</strong> — elas são a base de tudo. Entendendo
          escalas, os acordes e as progressões vão fazer muito mais sentido.
        </p>
        <Link
          href="/dashboard/escalas"
          className="inline-block mt-4 text-primary font-semibold text-sm hover:underline"
        >
          Ir para Escalas →
        </Link>
      </section>
    </div>
  );
}
