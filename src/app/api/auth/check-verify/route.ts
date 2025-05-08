import { publicApiClient } from '@/shared/core/lib/axios';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const verifyMailJson = await request.json();
  console.log(verifyMailJson);
  try {
    const { data } = await publicApiClient.post('/v1/auth/mail-verification', verifyMailJson);

    if (!data.status) {
      return NextResponse.json(
        {
          status: data.status,
          body: data.body,
        },
        {
          status: 404,
        }
      );
    } else {
      return NextResponse.json({
        status: data.status,
        body: data.body,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: '500',
        result: null,
      },
      { status: 500 }
    );
  }
}
