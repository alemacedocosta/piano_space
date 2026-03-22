import { Button } from "@/components/ui/Button";
import { Badge, PlanBadge } from "@/components/ui/Badge";
import { StreakCard } from "@/components/ui/Card";
import { ScaleDisplay } from "@/components/piano/ScaleDisplay";

export default function Home() {
  return (
    <main className="min-h-screen bg-sand-light">
      {/* Header */}
      <header className="bg-white border-b border-navy-light sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎹</span>
            <span className="font-bold text-navy text-lg">Piano space</span>
          </div>
          <div className="flex items-center gap-3">
            <PlanBadge plan="FREE" />
            <Button variant="primary" size="sm">Assinar PRO · R$&nbsp;1/mês</Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Hero */}
        <section className="text-center py-8">
          <h1 className="text-4xl font-bold text-navy mb-3">
            Piano no seu tempo<br />
            <span className="text-primary">na palma da sua mão</span>
          </h1>
          <p className="text-navy/60 text-lg">
            Toque com a ajuda de um assistente na hora que você quiser
          </p>
        </section>

        {/* Main demo — Scale Display */}
        <section>
          <h2 className="text-xl font-bold text-navy mb-4">🎼 Escalas Musicais</h2>
          <ScaleDisplay rootNote={0} scaleType="major" labelMode="note" size="md" />
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StreakCard currentStreak={7} longestStreak={14} totalMinutes={210} />
          <div className="rounded-xl bg-white border border-navy-light p-5 flex flex-col gap-3">
            <p className="text-sm font-semibold text-navy/60 uppercase tracking-wide">Módulos</p>
            {[
              { icon: "🎵", label: "Escalas musicais", count: "13 escalas" },
              { icon: "🎹", label: "Dicionário de acordes", count: "8 tipos" },
              { icon: "⭕", label: "Ciclo das quintas", count: "12 tons" },
              { icon: "🎶", label: "Progressão 251", count: "12 tonalidades" },
              { icon: "🔗", label: "Combinações de acordes", count: "por tonalidade" },
            ].map(({ icon, label, count }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-base">{icon}</span>
                <span className="text-sm text-navy flex-1">{label}</span>
                <Badge variant="outline" size="sm">{count}</Badge>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
