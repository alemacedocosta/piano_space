import Link from "next/link";

const modules = [
  {
    icon: "🎵",
    title: "Escalas musicais",
    desc: "Diatônicas, pentatônicas e modos gregos com visualização interativa no teclado.",
    color: "bg-primary/10 border-primary/30",
    iconBg: "bg-primary/20",
  },
  {
    icon: "🎹",
    title: "Dicionário de acordes",
    desc: "Maiores, menores, com sétima, diminutos e aumentados — formação e digitação.",
    color: "bg-accent/10 border-accent/30",
    iconBg: "bg-accent/20",
  },
  {
    icon: "⭕",
    title: "Ciclo das quintas",
    desc: "Entenda as relações entre tonalidades e como navegar entre elas.",
    color: "bg-sand/30 border-sand",
    iconBg: "bg-sand/60",
  },
  {
    icon: "🎶",
    title: "Progressões (II-V-I)",
    desc: "As progressões harmônicas mais usadas no jazz, MPB e música clássica.",
    color: "bg-navy/5 border-navy/20",
    iconBg: "bg-navy/10",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <nav className="border-b border-navy/10 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎹</span>
            <span className="font-bold text-navy text-lg tracking-tight">Piano space</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-navy/70 hover:text-navy text-sm font-medium transition-colors">
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Criar conta grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-sand-light to-white">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-6">
          <span>✨</span> Teoria musical do jeito certo
        </div>
        <h1 className="text-5xl font-bold text-navy leading-tight mb-4 max-w-2xl">
          Aprenda teoria musical <span className="text-primary">de verdade</span>
        </h1>
        <p className="text-navy/60 text-xl max-w-xl mb-10">
          Escalas, acordes, ciclo das quintas e progressões harmônicas — tudo explicado de forma
          visual e interativa, no seu ritmo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/cadastro"
            className="bg-primary text-white font-semibold px-8 py-3 rounded-xl text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Começar agora — é grátis
          </Link>
          <Link
            href="/login"
            className="border border-navy/20 text-navy font-semibold px-8 py-3 rounded-xl text-lg hover:bg-navy/5 transition-colors"
          >
            Já tenho conta
          </Link>
        </div>
      </section>

      {/* Módulos */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-3">O que você vai aprender</h2>
            <p className="text-navy/60 text-lg">4 módulos completos de teoria musical</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {modules.map((m) => (
              <div
                key={m.title}
                className={`rounded-2xl border p-6 flex gap-4 items-start ${m.color}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${m.iconBg}`}>
                  {m.icon}
                </div>
                <div>
                  <h3 className="font-bold text-navy text-lg mb-1">{m.title}</h3>
                  <p className="text-navy/60 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-4 bg-navy text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
        <p className="text-white/70 text-lg mb-8">Crie sua conta gratuita e acesse todos os módulos agora.</p>
        <Link
          href="/cadastro"
          className="bg-primary text-white font-semibold px-10 py-4 rounded-xl text-lg hover:bg-primary/90 transition-colors inline-block"
        >
          Criar conta grátis
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy/10 py-6 text-center text-navy/40 text-sm">
        © {new Date().getFullYear()} Piano space. Feito com 🎵
      </footer>
    </div>
  );
}
