import { privateApiClient } from '@/shared/core/lib/axios';
import { APIResponse, IClip } from '@/shared/data/types';
import { AxiosError } from 'axios';
import { NextResponse, NextRequest } from 'next/server';

// get
export async function GET(request: NextRequest, context: any) {
  const params = await context.params;
  const { id } = params;
  if (!id) return NextResponse.json({ status: 500, message: 'clip_id does not exist' }, { status: 500 });

  try {
    // api 요청
    const { status, data } = await privateApiClient.get<APIResponse<IClip>>(`/v1/clip/${id}`);

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

// delete
export async function DELETE(request: NextRequest, context: any) {
  const params = await context.params;
  const { id } = params;
  if (!id) return NextResponse.json({ status: 500, message: 'clip_id does not exist' }, { status: 500 });

  try {
    // api 요청
    const { status, data } = await privateApiClient.delete<APIResponse<string>>(`/v1/clip/delete/${id}`);

    console.log('/v1/clip/delete/[clip_id] api response check ', status, data.body);

    // 통신 체크
    if (status !== 200 || !data) {
      return NextResponse.json({ status: 500, message: 'Failed to delete clip' }, { status: 500 });
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
