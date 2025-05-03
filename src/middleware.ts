import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  try {
    // 토큰 가져오기
    const token = await getToken({ req, secret });

    const pathname = req.nextUrl.pathname;

    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!token && pathname.startsWith('/clips')) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }

    // 토큰이 있으면 요청 계속 진행
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    // 오류 시 안전하게 홈으로 리다이렉트
    return NextResponse.redirect(new URL('/', req.url));
  }
}
// 미들웨어가 적용될 경로 지정
export const config = {
  matcher: ['/clips/:path*', '/((?!api/auth|_next/static|_next/image|favicon.ico).*)/'],
};
