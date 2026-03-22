import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { prisma } from "./prisma";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(":");
    const hashBuf = Buffer.from(hash, "hex");
    const verify = scryptSync(password, salt, 64);
    return timingSafeEqual(hashBuf, verify);
  } catch {
    return false;
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user?.password) return null;
        const valid = verifyPassword(credentials.password, user.password);
        if (!valid) return null;
        return {
          id: user.id,
          email: user.email!,
          name: user.name,
          // Campos extras para verificação de trial
          createdAt: user.createdAt.toISOString(),
          paidAt: user.paidAt?.toISOString() ?? null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.createdAt = (user as any).createdAt;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.paidAt = (user as any).paidAt;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = session.user as any;
        u.id = token.id as string;
        u.createdAt = token.createdAt as string;
        u.paidAt = token.paidAt as string | null;
      }
      return session;
    },
  },
};
