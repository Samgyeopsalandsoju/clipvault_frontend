import 'next-auth';
import { DefaultSession } from 'next-auth';
import { AccountType } from './category';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: UserInfo;
  }

  interface User {
    id: string;
    result: {
      token: string;
    };
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
