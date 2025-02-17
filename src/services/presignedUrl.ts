import { APIResponse } from '@/types';
import axios from 'axios';

export const generatePutPresignedUrl = async ({ fileName, fileType }: { fileName: string; fileType: string }) => {
  const response = await axios.post<APIResponse<string>>(
    `/api/share-link/put-presigned-url`,
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
  const response = await axios.post<APIResponse<string>>(
    `/api/share-link/get-presigned-url`,
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
  const response = await axios.post<APIResponse<string>>(
    `/api/share-link/delete-presigned-url`,
    { key },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.body;
};
