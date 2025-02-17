import { generatePutUrl } from '@/libs';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/auth-options';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.accessToken) throw Error('No Session Error');

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
    const signedUrl = await generatePutUrl({ fileName, fileType, ownerToken: session.accessToken });

    console.log('signedUrl : ', signedUrl);
    console.log('put-presigned-url required data @@@@@@@');

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
