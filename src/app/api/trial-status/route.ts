import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const TRIAL_DAYS = 7;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as any).id as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { createdAt: true, paidAt: true },
  });

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysUsed = (Date.now() - user.createdAt.getTime()) / msPerDay;
  const daysRemaining = Math.max(0, TRIAL_DAYS - daysUsed);
  const expired = daysUsed > TRIAL_DAYS;
  const paid = user.paidAt !== null;

  return NextResponse.json({
    trialDays: TRIAL_DAYS,
    daysUsed: Math.min(daysUsed, TRIAL_DAYS),
    daysRemaining,
    expired,
    paid,
    paidAt: user.paidAt?.toISOString() ?? null,
  });
}
