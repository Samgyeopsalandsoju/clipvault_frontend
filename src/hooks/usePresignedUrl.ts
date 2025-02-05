import { generateGetPresignedUrl, generatePutPresignedUrl } from '@/services/presignedUrl';
import { useMutation } from '@tanstack/react-query';

export const usePresignedUrl = () => {
  const generatePutUrlMutation = useMutation({
    mutationFn: generatePutPresignedUrl,
    onSuccess: (data) => {
      console.log('generate Put Url data : ', data);
    },
  });

  const generateGetUrlMutation = useMutation({
    mutationFn: generateGetPresignedUrl,
    onSuccess: (data) => {
      console.log('generate Get Url data : ', data);
    },
  });

  return {
    generatePutUrl: generatePutUrlMutation.mutateAsync,
    generateGetUrl: generateGetUrlMutation.mutateAsync,
  };
};
