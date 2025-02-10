import { publicAPI } from '@/libs/axios/instance';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const userJsonData = await request.json();
  console.log('userJsonData', userJsonData);

  try {
    const { data } = await publicAPI.post('/v1/member/sign-up', userJsonData);
    console.log(data);

    if (!data.status) {
      return NextResponse.json(
        {
          code: data.body.code,
          result: false,
        },
        {
          status: 404,
        }
      );
    } else {
      return NextResponse.json({
        code: data.body.code,
        result: true,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: '500',
        errorMessage: error,
        result: null,
      },
      { status: 500 }
    );
  }
}
