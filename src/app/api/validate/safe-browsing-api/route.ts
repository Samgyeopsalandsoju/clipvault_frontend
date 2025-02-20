import axios, { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const jsonData = await request.json();

    // body 값 검증
    if (!jsonData || typeof jsonData !== 'object') {
      return NextResponse.json({ status: 400, message: 'Invalid JSON data' }, { status: 400 });
    }

    // 필수 값 체크
    const { url } = jsonData;
    if (!url) {
      return NextResponse.json({ status: 400, message: 'Missing required fields' }, { status: 400 });
    }

    const requestBody = {
      client: {
        clientId: 'clipVault',
        clientVersion: '1.0.0',
      },
      threatInfo: {
        threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE'],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: [{ url }],
      },
    };

    // api 요청
    const { status, data } = await axios.post(
      `${process.env.SAFE_BROWSING_BASE_URL}?key=${process.env.SAFE_BROWSING_API_KEY}`,
      requestBody
    );

    console.log('safe-browsing-api response check ', status, data);

    // 통신 체크
    if (status !== 200 || !data) {
      return NextResponse.json({ status: 500, message: 'Failed to create clip' }, { status: 500 });
    }

    // 결과 값 리턴
    return NextResponse.json({
      status: data.status,
      body: data,
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
    return NextResponse.json({ status: 500, message: 'Internal server error' }, { status: 500 });
  }
}
