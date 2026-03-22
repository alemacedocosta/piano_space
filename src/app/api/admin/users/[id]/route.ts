import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { hashPassword } from "@/lib/auth";

// PATCH — altera senha
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Não autorizado." }, { status: 403 });

  const { password } = await req.json();
  if (!password || password.length < 6)
    return NextResponse.json({ error: "Senha mínima de 6 caracteres." }, { status: 400 });

  // Impede alterar a própria senha por aqui
  const target = await prisma.user.findUnique({ where: { id: params.id } });
  if (!target) return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });

  await prisma.user.update({
    where: { id: params.id },
    data: { password: hashPassword(password) },
  });

  return NextResponse.json({ success: true });
}

// DELETE — remove usuário
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Não autorizado." }, { status: 403 });

  const target = await prisma.user.findUnique({ where: { id: params.id } });
  if (!target) return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });

  // Impede deletar o próprio admin
  if (target.email === session.user?.email)
    return NextResponse.json({ error: "Não é possível deletar o próprio admin." }, { status: 400 });

  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
