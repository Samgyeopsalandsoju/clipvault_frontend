import { generatePutUrl } from '@/libs/s3/generatePutUrl';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { fileName, fileType } = body;

  console.log('put-presigned-url required data @@@@@@@');
  console.log('fileName : ', fileName);
  console.log('fileType : ', fileType);

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

    console.log('signedUrl : ', signedUrl);
    console.log('put-presigned-url required data @@@@@@@');

    return NextResponse.json({
      status: 200,
      message: 'Successfully create signed url',
      result: signedUrl,
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
