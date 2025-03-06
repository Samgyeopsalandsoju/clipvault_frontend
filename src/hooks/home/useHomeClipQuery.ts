import { getForkedClips, getHomeClips } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useHomeClipQuery = () => {
  const { data: session, status } = useSession();
  // home 페이지에서 출력할 리스트
  const homeClipQuery = useQuery({
    queryKey: ['homeClip'],
    queryFn: getHomeClips,
    refetchOnWindowFocus: false,
  });

  const getAlreadyForkedList = useQuery({
    queryKey: ['homeForked'],
    queryFn: getForkedClips,
    enabled: !!session?.accessToken && status === 'authenticated',
  });

  return {
    home: {
      list: homeClipQuery.data ?? [],
      isClipLoading: homeClipQuery.isPending,
      forked: getAlreadyForkedList.data ?? [],
    },
  };
};
