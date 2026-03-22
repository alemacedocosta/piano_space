# Piano space — Guia de Deploy

## O que já está pronto

| Item | Status |
|------|--------|
| Next.js 14 + TypeScript + Tailwind | ✅ |
| Componentes UI (Button, Badge, Card, Input) | ✅ |
| Teclado virtual (PianoKey, PianoKeyboard, ScaleDisplay) | ✅ |
| Storybook 8 com 6 arquivos de stories | ✅ |
| Prisma schema com todas as entidades | ✅ |
| Supabase — projeto `piano-space` (sa-east-1) | ✅ |
| Migration aplicada (8 tabelas + seed) | ✅ |
| Vercel — team configurado | ✅ |
| Deploy final | ⬇️ siga os passos abaixo |

---

## Passo 1 — Configure a senha do Supabase no .env.local

Abra o arquivo `.env.local` e substitua `[SUA_SENHA_SUPABASE]` pela senha
do projeto. Você encontra em:

> Supabase Dashboard → piano-space → Settings → Database → Database password

Também gere o `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

---

## Passo 2 — Crie um repositório no GitHub

```bash
cd piano-space-app

# Inicie o git (se ainda não fez)
git init && git branch -m main
git add .
git commit -m "feat: initial Piano space app"

# Crie o repo no GitHub e suba
gh repo create piano-space --private --push --source=.
# OU use a interface do GitHub e:
git remote add origin https://github.com/SEU_USER/piano-space.git
git push -u origin main
```

---

## Passo 3 — Conecte na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Selecione o repositório `piano-space`
3. Em **Configure Project**, adicione as variáveis de ambiente do `.env.local`
4. Clique em **Deploy**

**OU**, se tiver o Vercel CLI instalado (`npm i -g vercel`):
```bash
cd piano-space-app
vercel deploy --prod
```
O team ID já está configurado em `.vercel/project.json`.

---

## Passo 4 — Rode o Storybook localmente

```bash
npm install
npm run storybook
# Abre em http://localhost:6006
```

Componentes disponíveis no Storybook:
- **UI / Button** — 7 variantes, 5 tamanhos
- **UI / Badge** — FREE, PRO, níveis, status
- **UI / Card** — LessonCard, SongCard, StreakCard
- **UI / NpsWidget** — pesquisa de satisfação
- **Piano / PianoKey** — tecla individual
- **Piano / PianoKeyboard** — teclado completo
- **Piano / ScaleDisplay** — display interativo de escalas

---

## Variáveis de ambiente para a Vercel

```
NEXT_PUBLIC_SUPABASE_URL=https://toglhxfuyfsrssbaumfp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres.toglhxfuyfsrssbaumfp:SENHA@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.toglhxfuyfsrssbaumfp:SENHA@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
NEXTAUTH_SECRET=<gerar com openssl>
NEXTAUTH_URL=https://piano-space.vercel.app
GOOGLE_CLIENT_ID=<do Google Cloud Console>
GOOGLE_CLIENT_SECRET=<do Google Cloud Console>
```

---

## Estrutura do projeto

```
piano-space-app/
├── src/
│   ├── app/               ← Next.js App Router
│   ├── components/
│   │   ├── ui/            ← Button, Badge, Card, Input, NpsWidget
│   │   └── piano/         ← PianoKey, PianoKeyboard, ScaleDisplay
│   └── lib/
│       └── utils.ts       ← cores, escalas, acordes, utilitários
├── stories/               ← Storybook (6 arquivos)
├── prisma/
│   └── schema.prisma      ← 8 modelos + enums
├── .storybook/            ← config Storybook
├── .vercel/               ← team ID pré-configurado
├── .env.local             ← variáveis Supabase preenchidas
├── vercel.json            ← config deploy (região GRU)
└── DEPLOY.md              ← este arquivo
```
