import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    const loginUrl = new URL('/home', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 미들웨어가 적용될 경로를 지정합니다.
export const config = {
  matcher: ['/clips/:path*', '/mypage/:path*', '/shareLink/:path*', '/forks/:path*'],
};
