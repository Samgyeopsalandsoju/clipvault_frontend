import { generateGetPresignedUrl, generatePutPresignedUrl } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const usePresignedUrl = () => {
  // preSignedURL put 링크 생성
  const generatePutUrlMutation = useMutation({
    mutationFn: generatePutPresignedUrl,
    onSuccess: (data) => {},
  });

  // preSignedURL get 링크 생성
  const generateGetUrlMutation = useMutation({
    mutationFn: generateGetPresignedUrl,
    onSuccess: (data) => {},
  });

  //  preSignedURL delete 링크 생성

  return {
    generatePutUrl: generatePutUrlMutation.mutateAsync,
    generateGetUrl: generateGetUrlMutation.mutateAsync,
  };
};
