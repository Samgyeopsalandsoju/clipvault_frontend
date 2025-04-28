import { useQuery } from '@tanstack/react-query';
import { getPublicLinkList } from './service';

export const usePublicLinkList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['public-links'],
    queryFn: getPublicLinkList,
  });

  return { data, isLoading, error };
};
