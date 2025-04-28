import { publicApiClient } from '@/app/lib';
import { APIResponse } from '@/shared/types/api';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import { IPublicClip } from '@/shared/types/clip';

export async function GET() {
  try {
    console.log('public clip list GET called..');
    // api 요청
    const { status, data } = await publicApiClient.get<APIResponse<IPublicClip[]>>(
      '/v1/clip/public/30'
    );

    // 통신 체크
    if (status !== 200 || !data) {
      return NextResponse.json(
        { status: 500, message: 'Failed to get public clip' },
        { status: 500 }
      );
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
