"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export default function AssinarPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Redireciona se não estiver logado
  if (status === "unauthenticated") {
    router.replace("/login");
    return null;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-white/50 text-sm">Carregando…</div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const digits = cardNumber.replace(/\s/g, "");
    if (digits.length < 16) { setError("Número de cartão inválido."); return; }
    if (expiry.length < 5)   { setError("Data de validade inválida."); return; }
    if (cvv.length < 3)      { setError("CVV inválido."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/pagamento", { method: "POST" });
      if (!res.ok) throw new Error("Erro no processamento.");
      setSuccess(true);
      // Redireciona após 2s para o dashboard
      setTimeout(() => router.replace("/dashboard"), 2000);
    } catch {
      setError("Não foi possível processar o pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const firstName = session?.user?.name?.split(" ")[0] ?? "Músico";

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      {/* Top bar */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎹</span>
          <span className="font-bold text-white text-base">Piano space</span>
        </Link>
        <Link
          href="/"
          className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1.5"
        >
          ← Voltar ao site
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          {success ? (
            /* ── Tela de sucesso ── */
            <div className="bg-white rounded-3xl p-8 text-center shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5 text-4xl">
                ✅
              </div>
              <h2 className="text-2xl font-bold text-navy mb-2">Pagamento confirmado!</h2>
              <p className="text-navy/60 text-sm mb-6">
                Bem-vindo de volta, {firstName}! Seu acesso foi liberado. Redirecionando…
              </p>
              <div className="w-full bg-navy/10 rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-[progress_2s_linear_forwards]" style={{ width: "100%", animationFillMode: "forwards" }} />
              </div>
            </div>
          ) : (
            /* ── Tela de pagamento ── */
            <>
              {/* Aviso de trial expirado */}
              <div className="bg-white/10 border border-white/20 rounded-2xl p-5 mb-6 text-center">
                <div className="text-3xl mb-3">⏰</div>
                <h1 className="text-white font-bold text-xl mb-2">
                  Seu período gratuito terminou, {firstName}
                </h1>
                <p className="text-white/70 text-sm leading-relaxed">
                  Os <strong className="text-white">7 dias de acesso gratuito</strong> chegaram ao fim.
                  Para continuar explorando escalas, acordes e progressões, faça a liberação completa
                  por apenas{" "}
                  <strong className="text-primary text-base">R$ 1,00</strong> — pagamento único, sem mensalidade.
                </p>
              </div>

              {/* Card de pagamento */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-navy">Liberar acesso completo</h2>
                    <p className="text-navy/50 text-sm">Cartão de crédito</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">R$ 1</div>
                    <div className="text-xs text-navy/40">pagamento único</div>
                  </div>
                </div>

                {/* Benefícios */}
                <ul className="mb-6 space-y-1.5">
                  {[
                    "✅ Acesso vitalício a todos os módulos",
                    "✅ Teclado interativo sem limitações",
                    "✅ Atualizações futuras incluídas",
                    "✅ Sem mensalidade, sem renovação",
                  ].map((item) => (
                    <li key={item} className="text-sm text-navy/70 flex items-center gap-2">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-navy/10 pt-5">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Nome no cartão */}
                    <div>
                      <label className="block text-xs font-semibold text-navy/50 uppercase tracking-wide mb-1.5">
                        Nome no cartão
                      </label>
                      <input
                        type="text"
                        required
                        autoComplete="cc-name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        placeholder="NOME SOBRENOME"
                        className="w-full border border-navy/20 rounded-xl px-4 py-2.5 text-navy placeholder:text-navy/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                      />
                    </div>

                    {/* Número do cartão */}
                    <div>
                      <label className="block text-xs font-semibold text-navy/50 uppercase tracking-wide mb-1.5">
                        Número do cartão
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          required
                          autoComplete="cc-number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          placeholder="0000 0000 0000 0000"
                          className="w-full border border-navy/20 rounded-xl px-4 py-2.5 text-navy placeholder:text-navy/30 text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition pr-12"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/20 text-lg">💳</span>
                      </div>
                    </div>

                    {/* Validade + CVV */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-navy/50 uppercase tracking-wide mb-1.5">
                          Validade
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          required
                          autoComplete="cc-exp"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/AA"
                          className="w-full border border-navy/20 rounded-xl px-4 py-2.5 text-navy placeholder:text-navy/30 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy/50 uppercase tracking-wide mb-1.5">
                          CVV
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          required
                          autoComplete="cc-csc"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="•••"
                          className="w-full border border-navy/20 rounded-xl px-4 py-2.5 text-navy placeholder:text-navy/30 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-crimson text-sm bg-crimson/10 border border-crimson/20 rounded-xl px-4 py-2.5">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60 text-base shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Processando…
                        </>
                      ) : (
                        <>🔒 Pagar R$ 1,00 e liberar acesso</>
                      )}
                    </button>
                  </form>

                  <p className="text-center text-navy/40 text-xs mt-4 flex items-center justify-center gap-1">
                    🔒 Pagamento seguro e criptografado
                  </p>
                </div>
              </div>

              {/* Link voltar LP */}
              <p className="text-center mt-6 text-white/40 text-sm">
                Não quer continuar?{" "}
                <Link href="/" className="text-white/70 hover:text-white underline transition-colors">
                  Voltar à página inicial
                </Link>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
