import { getHomeClips } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useHomeClipQuery = () => {
  // home 페이지에서 출력할 리스트
  const homeClipQuery = useQuery({
    queryKey: ['homeClip'],
    queryFn: getHomeClips,
  });

  return {
    home: {
      list: homeClipQuery.data ?? [],
      isClipLoading: homeClipQuery.isPending,
    },
  };
};
