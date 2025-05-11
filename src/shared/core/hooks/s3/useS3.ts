import { useMutation, useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '../useToast';
import { IClip } from '@/shared/data/types';
import { uploadFile } from '../../services';

export const useS3 = (url?: string) => {
  const toast = useToast();
  // 파일 생성에 필요한 데이터 생성
  const createUploadFileInfo = (clips: IClip[], title: string, due: string) => {
    const id = uuidv4();
    return {
      url: `https://clipvault.info/share/${id}`,
      clips: clips,
      title: title,
      expiresAt: due,
      fileName: `links/${id}.json`,
    };
  };

  const prepareFileData = ({ list, title, due }: { list: IClip[]; title: string; due: string }) => {
    const fileInfo = createUploadFileInfo(list, title, due);
    const fileContent = JSON.stringify(fileInfo, null, 2);
    const blob = new Blob([fileContent], { type: 'application/json' });

    return {
      url: fileInfo.url,
      blob,
      fileName: fileInfo.fileName,
    };
  };

  const uploadFileMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {},
  });

  // const getFileQuery = useQuery({
  //   queryKey: ['getShareFile', url],
  //   queryFn: () => fetchShareFileData({ url: url! }),
  //   enabled: !!url,
  // });

  return {
    prepareFileData: prepareFileData,
    // fileData: getFileQuery.data,
    // isFetching: getFileQuery.isPending,
    upload: uploadFileMutation.mutateAsync,
  };
};
