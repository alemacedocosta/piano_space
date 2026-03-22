import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { hashPassword } from "@/lib/auth";

// GET — lista todos os usuários
export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Não autorizado." }, { status: 403 });

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, createdAt: true, paidAt: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
}

// POST — cria novo usuário
export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Não autorizado." }, { status: 403 });

  const { name, email, password } = await req.json();

  if (!name || !email || !password)
    return NextResponse.json({ error: "Preencha todos os campos." }, { status: 400 });
  if (password.length < 6)
    return NextResponse.json({ error: "Senha mínima de 6 caracteres." }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    return NextResponse.json({ error: "E-mail já cadastrado." }, { status: 409 });

  const user = await prisma.user.create({
    data: { name, email, password: hashPassword(password) },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  return NextResponse.json(user, { status: 201 });
}
