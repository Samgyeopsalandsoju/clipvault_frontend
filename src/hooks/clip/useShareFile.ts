import { createToast } from '@/libs/toast';
import { fetchShareFileData, uploadFile } from '@/services';
import { IClipResponse } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

export const useShareFile = (url?: string) => {
  const toast = createToast();
  // 파일 생성에 필요한 데이터 생성
  const createUploadFileInfo = (clips: IClipResponse[], title: string, due: string) => ({
    id: uuidv4(),
    clips: clips,
    title: title,
    expiresAt: due,
  });

  const prepareFileData = ({ list, title, due }: { list: IClipResponse[]; title: string; due: string }) => {
    const fileInfo = createUploadFileInfo(list, title, due);
    const fileContent = JSON.stringify(fileInfo, null, 2);
    const blob = new Blob([fileContent], { type: 'application/json' });
    const fileName = `links/${fileInfo.id}.json`;

    return {
      id: fileInfo.id,
      blob,
      fileName,
    };
  };

  const uploadFileMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {},
  });

  const getFileQuery = useQuery({
    queryKey: ['getShareFile', url],
    queryFn: () => fetchShareFileData({ url: url! }),
    enabled: !!url,
  });

  return {
    prepareFileData: prepareFileData,
    fileData: getFileQuery.data,
    isFetching: getFileQuery.isPending,
    upload: uploadFileMutation.mutateAsync,
  };
};
