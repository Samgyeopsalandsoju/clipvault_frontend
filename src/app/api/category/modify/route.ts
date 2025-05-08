import { privateApiClient } from '@/shared/core/lib/axios';
import { ICategory } from '@/shared/data/types';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const body: ICategory[] = await request.json();

    // body 값 검증
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ status: 400, message: 'Invalid JSON data' }, { status: 400 });
    }
    console.log('body', body);
    // api 요청
    const { status, data } = await privateApiClient.patch('/v1/category/modify', body);

    console.log('/v1/category/edit api response check ', status, data);

    // 통신 체크
    if (status !== 200 || !data) {
      return NextResponse.json({ status: 500, message: 'Failed to post category list' }, { status: 500 });
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
      return NextResponse.json(
        {
          status: 500,
          message: 'axios Error ',
        },
        { status: 500 }
      );
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json(
        {
          status: 500,
          message: 'Unknown error',
        },
        { status: 500 }
      );
    }
  }
}
