"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "alemacedo@gmail.com";
const TRIAL_DAYS = 7;

interface User {
  id: string;
  name: string | null;
  email: string | null;
  createdAt: string;
  paidAt: string | null;
}

// ── Helpers de trial ──────────────────────────────────────────────────────────

function trialInfo(user: User) {
  if (user.paidAt) return { status: "paid" as const, daysUsed: TRIAL_DAYS, pct: 100 };
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysUsed = (Date.now() - new Date(user.createdAt).getTime()) / msPerDay;
  if (daysUsed > TRIAL_DAYS) return { status: "expired" as const, daysUsed: TRIAL_DAYS, pct: 100 };
  const pct = Math.min((daysUsed / TRIAL_DAYS) * 100, 100);
  const remaining = Math.max(0, TRIAL_DAYS - daysUsed);
  return { status: "active" as const, daysUsed, pct, remaining };
}

function TrialBar({ user }: { user: User }) {
  const info = trialInfo(user);

  if (info.status === "paid") {
    return (
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-primary/15 text-primary px-2.5 py-1 rounded-full">
          ✅ Pago
        </span>
        <span className="text-[10px] text-navy/40">
          {new Date(user.paidAt!).toLocaleDateString("pt-BR")}
        </span>
      </div>
    );
  }

  if (info.status === "expired") {
    return (
      <div className="min-w-[140px]">
        <div className="flex items-center justify-between mb-1">
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-crimson/10 text-crimson px-2 py-0.5 rounded-full">
            ⚠️ Expirado
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-crimson/20 overflow-hidden">
          <div className="h-full bg-crimson rounded-full w-full" />
        </div>
      </div>
    );
  }

  // active
  const { pct, remaining } = info as { status: "active"; daysUsed: number; pct: number; remaining: number };
  const barColor = pct < 50 ? "bg-primary" : pct < 80 ? "bg-sand-dark" : "bg-accent";
  const remainingText =
    remaining < 1
      ? "< 1 dia restante"
      : remaining < 2
      ? "1 dia restante"
      : `${Math.floor(remaining)} dias restantes`;

  return (
    <div className="min-w-[140px]">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-medium text-navy/50">{remainingText}</span>
        <span className="text-[10px] text-navy/40">{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-navy/10 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal de nova senha
  const [pwdModal, setPwdModal] = useState<User | null>(null);
  const [newPwd, setNewPwd] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError, setPwdError] = useState("");

  // Modal novo usuário
  const [addModal, setAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUserPwd, setNewUserPwd] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  // Feedback global
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // Redireciona se não for admin
  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.email !== ADMIN_EMAIL) router.replace("/dashboard");
  }, [session, status, router]);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    if (res.ok) setUsers(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    if (session?.user?.email === ADMIN_EMAIL) fetchUsers();
  }, [session]);

  if (status === "loading" || session?.user?.email !== ADMIN_EMAIL) return null;

  // Estatísticas rápidas
  const total = users.length;
  const paid = users.filter((u) => u.paidAt).length;
  const expired = users.filter((u) => !u.paidAt && trialInfo(u).status === "expired").length;
  const active = users.filter((u) => !u.paidAt && trialInfo(u).status === "active").length;

  // ── Deletar usuário ──────────────────────────────────────────────────────────
  async function handleDelete(user: User) {
    if (!confirm(`Deletar "${user.name ?? user.email}"? Esta ação não pode ser desfeita.`)) return;
    const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Usuário deletado.");
      fetchUsers();
    } else {
      const d = await res.json();
      showToast(d.error ?? "Erro ao deletar.");
    }
  }

  // ── Alterar senha ────────────────────────────────────────────────────────────
  async function handlePwdSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pwdModal) return;
    setPwdError("");
    setPwdLoading(true);
    const res = await fetch(`/api/admin/users/${pwdModal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPwd }),
    });
    setPwdLoading(false);
    if (res.ok) {
      setPwdModal(null);
      setNewPwd("");
      showToast("Senha alterada com sucesso.");
    } else {
      const d = await res.json();
      setPwdError(d.error ?? "Erro ao alterar senha.");
    }
  }

  // ── Criar usuário ────────────────────────────────────────────────────────────
  async function handleAddSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAddError("");
    setAddLoading(true);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, email: newEmail, password: newUserPwd }),
    });
    setAddLoading(false);
    if (res.ok) {
      setAddModal(false);
      setNewName(""); setNewEmail(""); setNewUserPwd("");
      showToast("Usuário criado com sucesso.");
      fetchUsers();
    } else {
      const d = await res.json();
      setAddError(d.error ?? "Erro ao criar usuário.");
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto">

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 bg-navy text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium z-50 animate-fade-in">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Gestão de Usuários</h1>
          <p className="text-navy/50 text-sm mt-1">Área restrita — somente administrador</p>
        </div>
        <button
          onClick={() => setAddModal(true)}
          className="bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <span className="text-base">+</span> Novo usuário
        </button>
      </div>

      {/* Cartões de resumo de trial */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-2xl border border-navy/10 p-4 text-center">
          <div className="text-2xl font-bold text-navy">{total}</div>
          <div className="text-xs text-navy/50 mt-0.5">Total</div>
        </div>
        <div className="bg-white rounded-2xl border border-primary/20 p-4 text-center">
          <div className="text-2xl font-bold text-primary">{active}</div>
          <div className="text-xs text-navy/50 mt-0.5">Em trial</div>
        </div>
        <div className="bg-white rounded-2xl border border-crimson/20 p-4 text-center">
          <div className="text-2xl font-bold text-crimson">{expired}</div>
          <div className="text-xs text-navy/50 mt-0.5">Expirados</div>
        </div>
        <div className="bg-white rounded-2xl border border-primary/20 p-4 text-center">
          <div className="text-2xl font-bold text-primary">{paid}</div>
          <div className="text-xs text-navy/50 mt-0.5">Pagos</div>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-navy/10 flex items-center gap-2">
          <span className="text-navy font-semibold text-sm">{users.length} usuário{users.length !== 1 ? "s" : ""}</span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-navy/40 text-sm">Carregando...</div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center text-navy/40 text-sm">Nenhum usuário cadastrado.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy/10 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-navy/40 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-xs font-semibold text-navy/40 uppercase tracking-wider hidden sm:table-cell">E-mail</th>
                  <th className="px-6 py-3 text-xs font-semibold text-navy/40 uppercase tracking-wider hidden md:table-cell">Cadastro</th>
                  <th className="px-6 py-3 text-xs font-semibold text-navy/40 uppercase tracking-wider">Período gratuito</th>
                  <th className="px-6 py-3 text-xs font-semibold text-navy/40 uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/5">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-sand-light/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                          {(u.name ?? u.email ?? "?")[0].toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-navy">
                          {u.name ?? "—"}
                          {u.email === ADMIN_EMAIL && (
                            <span className="ml-2 text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full font-semibold">admin</span>
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-navy/60 hidden sm:table-cell">{u.email}</td>
                    <td className="px-6 py-4 text-sm text-navy/40 hidden md:table-cell">
                      {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4">
                      {u.email === ADMIN_EMAIL ? (
                        <span className="text-xs text-navy/30 italic">—</span>
                      ) : (
                        <TrialBar user={u} />
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setPwdModal(u); setNewPwd(""); setPwdError(""); }}
                          className="text-xs px-3 py-1.5 rounded-lg border border-navy/20 text-navy/60 hover:text-navy hover:border-navy/40 transition-colors"
                        >
                          Alterar senha
                        </button>
                        {u.email !== ADMIN_EMAIL && (
                          <button
                            onClick={() => handleDelete(u)}
                            className="text-xs px-3 py-1.5 rounded-lg border border-crimson/20 text-crimson/70 hover:text-crimson hover:border-crimson/40 transition-colors"
                          >
                            Deletar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Legenda */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-navy/40 px-1">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /> Em trial (1–6 dias)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block" /> Trial avançado (6–7 dias)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-crimson inline-block" /> Trial expirado
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block border border-primary" /> ✅ Pago
        </span>
      </div>

      {/* Modal — Alterar senha */}
      {pwdModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-navy mb-1">Alterar senha</h2>
            <p className="text-sm text-navy/50 mb-5">
              Usuário: <span className="font-medium text-navy">{pwdModal.email}</span>
            </p>
            <form onSubmit={handlePwdSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Nova senha</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full border border-navy/20 rounded-lg px-4 py-2.5 text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
              {pwdError && (
                <p className="text-crimson text-sm bg-crimson/10 border border-crimson/20 rounded-lg px-4 py-2">{pwdError}</p>
              )}
              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => setPwdModal(null)}
                  className="flex-1 py-2.5 rounded-xl border border-navy/20 text-navy text-sm font-semibold hover:bg-sand-light transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={pwdLoading}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {pwdLoading ? "Salvando…" : "Salvar senha"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal — Novo usuário */}
      {addModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-navy mb-5">Novo usuário</h2>
            <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Nome</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nome completo"
                  className="w-full border border-navy/20 rounded-lg px-4 py-2.5 text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                  className="w-full border border-navy/20 rounded-lg px-4 py-2.5 text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Senha</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newUserPwd}
                  onChange={(e) => setNewUserPwd(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full border border-navy/20 rounded-lg px-4 py-2.5 text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
              {addError && (
                <p className="text-crimson text-sm bg-crimson/10 border border-crimson/20 rounded-lg px-4 py-2">{addError}</p>
              )}
              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => { setAddModal(false); setAddError(""); }}
                  className="flex-1 py-2.5 rounded-xl border border-navy/20 text-navy text-sm font-semibold hover:bg-sand-light transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {addLoading ? "Criando…" : "Criar usuário"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
