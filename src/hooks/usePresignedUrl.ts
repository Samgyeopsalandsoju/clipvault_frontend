import { generateDeletePresignedUrl, generateGetPresignedUrl, generatePutPresignedUrl } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const usePresignedUrl = () => {
  // preSignedURL put 링크 생성
  const generatePutUrlMutation = useMutation({
    mutationFn: generatePutPresignedUrl,
    onSuccess: () => {},
  });

  // preSignedURL get 링크 생성
  const generateGetUrlMutation = useMutation({
    mutationFn: generateGetPresignedUrl,
    onSuccess: () => {},
  });

  //  preSignedURL delete 링크 생성
  const generateDeleteUrlMutation = useMutation({
    mutationFn: generateDeletePresignedUrl,
    onSuccess: () => {},
  });

  return {
    generatePutUrl: generatePutUrlMutation.mutateAsync,
    generateGetUrl: generateGetUrlMutation.mutateAsync,
    generateDeleteUrl: generateDeleteUrlMutation.mutateAsync,
  };
};
