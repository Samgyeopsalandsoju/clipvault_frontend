import { generatePutUrl } from '@/libs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { fileName, fileType } = body;

  if (!fileName || !fileType) {
    return NextResponse.json(
      {
        status: 200,
        message: 'Missing fileName or fileType',
        result: null,
      },
      { status: 500 }
    );
  }

  try {
    const signedUrl = await generatePutUrl({ fileName, fileType, ownerToken: '123' });
    return NextResponse.json({
      status: 200,
      message: 'Successfully create signed url',
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
