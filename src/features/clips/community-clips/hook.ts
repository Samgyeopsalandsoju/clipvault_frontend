import { useQuery } from '@tanstack/react-query';
import { getCommunityClips } from './service';

export const useCommunityClips = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['public-links'],
    queryFn: getCommunityClips,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
};
