'use client';

import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../service';

export const useGetCategory = () => {
  const getCategoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return { categories: getCategoryQuery.data ?? [], isLoading: getCategoryQuery.isPending };
};
