import { fetchTotalClipsCount, fetchTotalShareCount } from '@/services/stateService';
import { useQuery } from '@tanstack/react-query';

export const useStateQuery = () => {
  const getTotalClipsCountQuery = useQuery({
    queryKey: ['totalClipCount'],
    queryFn: fetchTotalClipsCount,
  });

  const getTotalShareCountQuery = useQuery({
    queryKey: ['totalShareCount'],
    queryFn: fetchTotalShareCount,
  });

  return {
    clipCount: getTotalClipsCountQuery.data,
    shareCount: getTotalShareCountQuery.data,
  };
};
