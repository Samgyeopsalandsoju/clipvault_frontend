// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// const secret = process.env.NEXTAUTH_SECRET;

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret });

//   if (!token) {
//     return NextResponse.redirect('/home');
//   }

//   return NextResponse.next();
// }

// // 미들웨어가 적용될 경로를 지정합니다.
// export const config = {
//   matcher: ['/clips/:path*', '/mypage/:path*', '/shareLink/:path*', '/forks/:path*'],
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  try {
    // 토큰 확인 시도
    const token = await getToken({ req, secret });

    // 토큰이 없으면 /home으로 리다이렉트
    if (!token) {
      // 가장 간단한 방법: 상대 경로 사용
      return NextResponse.redirect(new URL('/home', req.url));
    }

    // 토큰이 있으면 요청 계속 진행
    return NextResponse.next();
  } catch (error) {
    // 오류 로깅 (서버 로그에 기록됨)
    console.error('미들웨어 오류:', error);

    // 오류가 발생해도 /home으로 리다이렉트
    return NextResponse.redirect(new URL('/home', req.url));
  }
}

// 미들웨어가 적용될 경로를 지정
export const config = {
  matcher: ['/clips/:path*', '/mypage/:path*', '/shareLink/:path*', '/forks/:path*'],
};
