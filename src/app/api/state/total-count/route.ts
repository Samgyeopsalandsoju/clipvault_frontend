import { publicAPI } from '@/libs';
import { APIResponse, ITotalCountState } from '@/types';
import { AxiosError } from 'axios';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // api 요청
    const { status, data } = await publicAPI.get<APIResponse<ITotalCountState>>(`/v1/main/total`);

    console.log('/v1/main/total api response check ', status, data.body);

    // 통신 체크
    if (status !== 200 || !data) {
      return NextResponse.json({ status: 500, message: 'Failed to get state data' }, { status: 500 });
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
