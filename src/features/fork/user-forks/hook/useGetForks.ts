import { useQuery } from '@tanstack/react-query';
import { forkService } from '../service';

export const useGetForks = () => {
  const getForksQuery = useQuery({
    queryKey: ['fork-list'],
    queryFn: forkService.getForks,
  });

  return {
    forks: getForksQuery.data ?? [],
    isLoading: getForksQuery.isPending,
  };
};
