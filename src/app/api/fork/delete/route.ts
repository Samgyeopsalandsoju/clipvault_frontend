import { privateAPI } from '@/libs';
import { IDoForkRequest } from '@/types';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    const body: IDoForkRequest = await request.json();

    // body 값 검증
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ status: 400, message: 'Invalid JSON data' }, { status: 400 });
    }

    // 필수 값 체크
    const { clipId, forkId } = body;
    if (!clipId || !forkId) {
      return NextResponse.json({ status: 400, message: 'Missing required fields' }, { status: 400 });
    }

    console.info('@ /api/fork/delete 요청 데이터:', body);

    // api 요청
    const { status, data } = await privateAPI.delete(`/v1/fork/delete/${forkId}/${clipId}`);

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
