import { getHomeClips } from '@/services/homeService';
import { useQuery } from '@tanstack/react-query';

export const useHomeClipQuery = () => {
  const homeClipQuery = useQuery({
    queryKey: ['homeClip'],
    queryFn: getHomeClips,
  });

  return {
    home: {
      list: homeClipQuery.data ?? [],
    },
  };
};
