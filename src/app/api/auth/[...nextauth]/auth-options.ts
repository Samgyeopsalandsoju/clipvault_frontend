import { publicAPI } from '@/libs/axios/instance';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        mail: { label: 'Mail', type: 'mail' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { status, data } = await publicAPI.post('/v1/member/login', {
            mail: credentials?.mail,
            password: credentials?.password,
          });

          if (status !== 200) {
            throw new Error('Login failed');
          }

          if (!data.status) {
            throw new Error('Login failed');
          }

          return {
            id: credentials?.mail ?? 'default_id',
            result: data.body,
          };
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.result.token;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
      };
    },
  },
  pages: {
    signIn: '/home',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
};
