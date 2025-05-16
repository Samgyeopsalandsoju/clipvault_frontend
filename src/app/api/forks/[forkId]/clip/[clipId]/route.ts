import { privateApiClient } from '@/shared/core/lib/axios';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function DELETE(_: NextRequest, { params }: { params: { forkId: string; clipId: string } }) {
  try {
    const { forkId, clipId } = params;
    if (!forkId && clipId)
      return NextResponse.json({ status: 500, message: 'clip_id does not exist' }, { status: 500 });

    // 필수 값 체크
    if (!clipId || !forkId) {
      return NextResponse.json({ status: 400, message: 'Missing required fields' }, { status: 400 });
    }

    // api 요청
    const { status, data } = await privateApiClient.delete(`/v1/fork/delete/${forkId}/${clipId}`);

    console.log('/v1/fork/delete api response check ', status, data);

    // 통신 체크
    if (status !== 200 || !data) {
      return NextResponse.json({ status: 500, message: 'Failed to delete fork' }, { status: 500 });
    }

    // 결과 값 리턴
    return NextResponse.json({
      status: data.status,
      body: data.body,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios Error:');
      console.error('Status:', error.response?.status);
      console.error('Message:', error.response?.data?.detail || error.message);
      console.error('URL:', error.config?.url);
      console.error('Method:', error.config?.method);
    } else {
      console.error('Unknown error:', error);
    }

    return NextResponse.json(
      {
        status: false,
        body: '',
      },
      {
        status: 500,
      }
    );
  }
}
