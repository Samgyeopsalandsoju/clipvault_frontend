import { publicAPI } from '@/libs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        mail: { label: 'Mail', type: 'mail' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          console.log('Attempting login with:', credentials?.mail);
          const { status, data } = await publicAPI.post('/v1/member/login', {
            mail: credentials?.mail,
            password: credentials?.password,
          });
          console.log('Login response:', status, data);
          if (status !== 200) {
            throw new Error('Login failed');
          }

          if (!data.status) {
            throw new Error('Login failed');
          }

          return {
            id: credentials?.mail ?? 'default_id',
            result: { token: data.body },
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
        token.id = user.id;
        token.loginTime = Date.now();
      }

      return token;
    },
    async session({ session, token }) {
      if (token.expired) {
        return {
          ...session,
          expires: new Date(0).toISOString(),
          error: 'TokenExpired',
        };
      }

      return {
        ...session,
        accessToken: token.accessToken,
        loginTime: token.loginTime,
        id: token.id,
        error: 'alive',
      };
    },
  },
  pages: {
    signIn: '/home',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 30,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 60 * 30,
  },

  debug: process.env.NODE_ENV === 'development',
};
