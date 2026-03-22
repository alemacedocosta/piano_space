import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST — registra o pagamento do usuário (simula confirmação do gateway)
// Em produção: este endpoint seria chamado pelo webhook do gateway de pagamento.
export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as any).id as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { paidAt: true },
  });

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
  }

  if (user.paidAt) {
    // Já pagou — retorna sucesso sem alterar
    return NextResponse.json({ ok: true, paidAt: user.paidAt.toISOString() });
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { paidAt: new Date() },
    select: { paidAt: true },
  });

  return NextResponse.json({ ok: true, paidAt: updated.paidAt?.toISOString() });
}
