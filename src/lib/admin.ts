import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const ADMIN_EMAIL = "alemacedo@gmail.com";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email !== ADMIN_EMAIL) return null;
  return session;
}
