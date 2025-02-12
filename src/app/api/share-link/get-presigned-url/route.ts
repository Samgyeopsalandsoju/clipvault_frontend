import { generateGetUrl } from '@/libs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { key } = body;

  console.log('get-presigned-url required data #########');
  console.log('key : ', key);

  if (!key) {
    return NextResponse.json(
      {
        status: 200,
        message: 'Missing fileName',
        result: null,
      },
      { status: 500 }
    );
  }

  try {
    const signedUrl = await generateGetUrl({ key });

    console.log('signedUrl : ', signedUrl);
    console.log('get-presigned-url required data #########');

    return NextResponse.json({
      status: 200,
      body: signedUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: '500',
        errorMessage: `Error generating presigned URL : ${error}`,
        result: null,
      },
      { status: 500 }
    );
  }
}
