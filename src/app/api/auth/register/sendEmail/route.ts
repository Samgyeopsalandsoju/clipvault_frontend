import { publicAPI } from '@/libs/axios/instance';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const emailJson = await request.json();
  try {
    const { data } = await publicAPI.post('/v1/auth/mail-sending', emailJson);

    // 실패
    if (!data.status) {
      return NextResponse.json({
        code: data.body.code,
        result: data.body,
      });
      // 성공
    } else {
      return NextResponse.json({
        code: data.body.code,
        result: data.body,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: '500',
        message: error,
        result: null,
      },
      { status: 500 }
    );
  }
}
