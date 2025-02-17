import { privateAPI } from '@/libs';
import { APIResponse, IClipResponse } from '@/types';
import { AxiosError } from 'axios';
import { NextResponse, NextRequest } from 'next/server';

type Props = {
  params: {
    clip_id: string;
  };
};

export async function GET(request: NextRequest, context: any) {
  const params = await context.params;
  const { clip_id } = params;
  if (!clip_id) return NextResponse.json({ status: 500, message: 'clip_id does not exist' }, { status: 500 });

  try {
    // api 요청
    const { status, data } = await privateAPI.get<APIResponse<IClipResponse>>(`/v1/clip/${clip_id}`);

    console.log('/v1/clip/[clip_id] api response check ', status, data.body);

    // 통신 체크
    if (status !== 200 || !data) {
      return NextResponse.json({ status: 500, message: 'Failed to get clip info' }, { status: 500 });
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
