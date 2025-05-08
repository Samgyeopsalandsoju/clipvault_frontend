import { privateApiClient } from '@/shared/core/lib/axios';
import { APIResponse } from '@/shared/data/types';
import { AxiosError } from 'axios';
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(request: NextRequest, context: any) {
  const params = await context.params;
  const { category_Id } = params;
  if (!category_Id) return NextResponse.json({ status: 500, message: 'category_Id does not exist' }, { status: 500 });
  console.log('category_Id', category_Id);

  try {
    // api 요청
    const { status, data } = await privateApiClient.delete<APIResponse<string>>(`/v1/category/delete/${category_Id}`);

    console.log('/v1/category/delete/[category_Id] api response check ', status, data.body);

    // 통신 체크
    if (status !== 200 || !data) {
      return NextResponse.json({ status: 500, message: 'Failed to delete category' }, { status: 500 });
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
