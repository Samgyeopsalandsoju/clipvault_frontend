import { checkSafeBrowsing } from '@/services/validateUrlService';
import { useMutation } from '@tanstack/react-query';

export const useSafeBrowsingApiQuery = () => {
  const checkSafeBrowsingMutation = useMutation({
    mutationFn: checkSafeBrowsing,
    onSuccess: () => {
      console.log('checkSafeBrowsing Success');
    },
    onError: () => {
      console.log('checkSafeBrowsing Error');
    },
  });

  return {
    validate: checkSafeBrowsingMutation.mutateAsync,
  };
};
