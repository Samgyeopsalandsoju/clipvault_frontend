import { IClip } from '@/shared/data/types';
import { v4 as uuidv4 } from 'uuid';

export const addItemWithLimit = (code: any) => {
  let param;
  if (typeof code === 'object') {
    param = code.code;
  } else {
    param = code;
  }

  const CODE_EXCEEDED = '99999';
  if (param === CODE_EXCEEDED) {
    return { status: false, message: 'Generation limit exceeded.' };
  }
  return { status: true, message: '' };
};

const createUploadFileInfo = (clips: IClip[], title: string, due: string) => {
  const id = uuidv4();
  return {
    url: `clipvault.info/share-page/${id}`,
    clips: clips,
    title: title,
    expiresAt: due,
    fileName: `links/${id}.json`,
  };
};

export const prepareFileData = ({ list, title, due }: { list: IClip[]; title: string; due: string }) => {
  const fileInfo = createUploadFileInfo(list, title, due);
  const fileContent = JSON.stringify(fileInfo, null, 2);
  const blob = new Blob([fileContent], { type: 'application/json' });

  return {
    url: fileInfo.url,
    blob,
    fileName: fileInfo.fileName,
  };
};
