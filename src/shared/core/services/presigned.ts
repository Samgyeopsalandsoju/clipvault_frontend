import { APIResponse } from '@/shared/data/types';
import { apiClient } from '../lib/axios';

export const generatePutPresignedUrl = async ({ fileName, fileType }: { fileName: string; fileType: string }) => {
  const response = await apiClient.post<APIResponse<string>>(
    `/presigned/put`,
    {
      fileName,
      fileType,
    },
    {
      headers: {
        'Content-Type': fileType,
      },
    }
  );
  return response.data.body;
};

export const generateGetPresignedUrl = async (fileName: string) => {
  const key = `links/${fileName}.json`;
  const response = await apiClient.post<APIResponse<string>>(
    `/presigned/get`,
    { key },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.body;
};

export const generateDeletePresignedUrl = async (fileName: string) => {
  const key = `links/${fileName}.json`;
  const response = await apiClient.post<APIResponse<string>>(
    `/presigned/delete`,
    { key },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.body;
};
