import { useQuery } from '@tanstack/react-query';
import { getForks } from '../service';

export const useGetForks = () => {
  const getForksQuery = useQuery({
    queryKey: ['fork-list'],
    queryFn: getForks,
  });

  return {
    forks: getForksQuery.data ?? [],
    isLoading: getForksQuery.isPending,
  };
};
