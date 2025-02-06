import { fetchShareFileData, uploadFile } from '@/services/shareService';
import { IClipResponse } from '@/types/clip';
import { useMutation, useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

export const useShareLink = (url?: string) => {
  // 파일 생성에 필요한 데이터 생성
  const createUploadFileInfo = (clips: IClipResponse[]) => ({
    id: uuidv4(),
    clips: clips,
    email: 'test@gmail.com',
    createdBy: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  });

  const prepareFileData = ({ list }: { list: IClipResponse[] }) => {
    const info = createUploadFileInfo(list);
    const fileContent = JSON.stringify(info, null, 2);
    const blob = new Blob([fileContent], { type: 'application/json' });
    const fileName = `links/${info.id}.json`;

    return {
      id: info.id,
      blob,
      fileName,
    };
  };

  const uploadFileMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      console.log('uploadFile data  : ', data);
    },
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
