import { getServerSession } from 'next-auth/next';
import { authOptions } from '../lib/auth-options';

export const getSessionToken = async () => {
  const session = await getServerSession(authOptions);
  return session?.accessToken || null;
};
