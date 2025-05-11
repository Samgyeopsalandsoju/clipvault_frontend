import { useQuery } from '@tanstack/react-query';
import { shareService } from '../service';

export const useShareLinks = () => {
  const getShareLinks = useQuery({
    queryKey: ['share-links'],
    queryFn: shareService.getShareLinks,
  });

  return {
    list: getShareLinks.data ?? [],
    isLoading: getShareLinks.isPending,
  };
};
