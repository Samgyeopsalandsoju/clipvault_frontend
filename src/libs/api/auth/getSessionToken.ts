import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export async function getSessionToken() {
  const session = await getServerSession(authOptions);
  return session?.accessToken || null;
}
