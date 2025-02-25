import { getServerSession } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';

export async function getSessionToken(authOptions: NextAuthOptions) {
  const session = await getServerSession(authOptions);
  return session?.accessToken || null;
}
