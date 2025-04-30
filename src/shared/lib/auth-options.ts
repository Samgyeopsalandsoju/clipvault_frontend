import { publicApiClient } from '@/app/lib';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        // 구글 로그인 후 받은 프로필에서 id_token을 사용해 백엔드 서버에 요청
        // const res = await fetch('https://your-backend-server.com/api/auth/google', {
        //   method: 'POST',
        //   body: JSON.stringify({ id_token: profile.id_token }), // 구글에서 받은 id_token을 서버에 전달
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        // const { token } = await res.json(); // 백엔드에서 반환한 서비스 토큰을 받아옴

        // // 토큰을 포함한 프로필 반환
        return { ...profile };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        mail: { label: 'Mail', type: 'mail' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { status, data } = await publicApiClient.post('/v1/member/login', {
            mail: credentials?.mail,
            password: credentials?.password,
          });
          if (status !== 200) {
            return null;
          }

          if (!data.status) {
            throw new Error('Login failed');
          }

          return {
            id: credentials?.mail ?? 'default_id',
            result: { token: data.body },
          };
        } catch (error) {
          console.error(error);
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
