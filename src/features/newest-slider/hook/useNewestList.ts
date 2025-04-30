import { useQuery } from '@tanstack/react-query';
import { getNewestList } from '../service';

// home clip 목록 조회
export const useNewestList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['public-links'],
    queryFn: getNewestList,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
};
