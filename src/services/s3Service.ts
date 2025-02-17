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
  return `https://clipvault.info/share/${id}`;
};

export const deleteFile = async (url: string) => {
  try {
    await axios.delete(url);
  } catch (error) {
    console.error(`Error: `, error);
  }
};
