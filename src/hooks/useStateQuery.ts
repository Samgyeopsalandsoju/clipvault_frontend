import { getTotalCounts } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useStateQuery = () => {
  const getTotalCountsQuery = useQuery({
    queryKey: ['totalCounts'],
    queryFn: getTotalCounts,
  });

  return {
    counts: getTotalCountsQuery.data,
  };
};
