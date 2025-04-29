import { useQuery } from '@tanstack/react-query';
import { getUserClips } from './service';

export const useUserClips = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['personal-link-list'],
    queryFn: getUserClips,
  });

  return { data, isLoading };
};
