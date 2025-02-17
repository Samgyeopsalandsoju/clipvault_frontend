import { privateAPI } from '@/libs';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { share_id: string } }) {
  try {
    const parameters = await params;
    const share_id = parameters.share_id;

    console.info('@ /api/share-link/delete called', share_id);

    // api 요청
    const { status, data } = await privateAPI.delete(`/v1/share/delete/${share_id}`);

    console.log('/v1/share/delete api response check ', status, data);

    // 통신 체크
    if (status !== 200 || !data) {
      return NextResponse.json({ status: 500, message: 'Failed to delete Share Link' }, { status: 500 });
    }

    // 결과 값 리턴
    return NextResponse.json({
      status: data.status,
      body: null,
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
