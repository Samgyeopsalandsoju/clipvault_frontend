import { privateApiClient } from '@/shared/core/lib/axios';
import { APIResult } from '@/shared/data/types';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body: { clipId: string } = await request.json();

    // body 값 검증
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ status: 400, message: 'Invalid JSON data' }, { status: 400 });
    }

    // 필수 값 체크

    // api 요청
    const { status, data } = await privateApiClient.post<APIResult<string>>('/v1/fork/create', body);

    console.log('/v1/fork/create api response check ', status, data);

    // 통신 체크
    if (status !== 200 || !data) {
      return NextResponse.json({ status: 500, message: 'Failed to create fork' }, { status: 500 });
    }

    if (data.status) {
      return NextResponse.json({
        status: data.status,
        body: data.body,
      });
    } else {
      return NextResponse.json({
        status: data.status,
        body: data.body.code,
      });
    }
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
