import axios from 'axios';

export const uploadFile = async ({ url, file, fileType }: { url: string; fileType: string; file: Blob }) => {
  const response = await axios.put(url, file, { headers: { 'Content-Type': fileType } });
  return response.status;
};

export const deleteFile = async (url: string) => {
  try {
    await axios.delete(url);
  } catch (error) {
    console.error(`Error: `, error);
  }
};
