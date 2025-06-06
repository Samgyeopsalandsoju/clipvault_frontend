import { IModifyForm } from '@/features/clip/model/types';
import { privateApiClient } from '@/shared/core/lib/axios';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function PATCH(request: NextRequest) {
  const body: IModifyForm = await request.json();
  try {
    // body 값 검증
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ status: 400, message: 'Invalid JSON data' }, { status: 400 });
    }

    // 필수 값 체크
    const { title, category, link, visible } = body;
    if (!title || !category || !link || !visible) {
      return NextResponse.json({ status: 400, message: 'Missing required fields' }, { status: 400 });
    }

    // api 요청
    const { status, data } = await privateApiClient.patch('/v1/clip/modify', body);

    // 통신 체크
    if (status !== 200 || !data) {
      return NextResponse.json({ status: 500, message: 'Failed to modify clip' }, { status: 500 });
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
  }
}
