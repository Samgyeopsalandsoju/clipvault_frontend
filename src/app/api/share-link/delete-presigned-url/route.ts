import { generateDeleteUrl } from '@/libs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { key } = body;

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
    console.log('delete presigned url', key);
    const signedUrl = await generateDeleteUrl({ key });
    console.log('signedUrl', signedUrl);

    return NextResponse.json({
      status: 200,
      body: signedUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: '500',
        errorMessage: `Error generating Delete presigned URL : ${error}`,
        result: null,
      },
      { status: 500 }
    );
  }
}
