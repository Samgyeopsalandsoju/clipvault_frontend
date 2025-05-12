import { useMutation, useQuery } from '@tanstack/react-query';
import { generateDeletePresignedUrl, generateGetPresignedUrl, generatePutPresignedUrl } from '../../services';

export const usePresignedUrl = () => {
  // preSignedURL put 링크 생성
  const generatePutUrlMutation = useMutation({
    mutationFn: generatePutPresignedUrl,
    onSuccess: () => {},
  });

  // preSignedURL get 랑크 생성
  const generateGetUrlMutation = useMutation({
    mutationFn: generateGetPresignedUrl,
    onSuccess: () => {},
  });

  // //  preSignedURL delete 링크 생성
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
