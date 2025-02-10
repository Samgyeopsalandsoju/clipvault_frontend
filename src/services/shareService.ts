import axios from 'axios';

export const uploadFile = async ({
  id,
  url,
  file,
  fileType,
}: {
  id: string;
  url: string;
  fileType: string;
  file: Blob;
}) => {
  await axios.put(url, file, { headers: { 'Content-Type': fileType } });
  return `localhost:3000/share/${id}`;
};

export const fetchShareFileData = async ({ url }: { url: string }) => {
  const response = await axios.get(url);
  return response.data;
};
