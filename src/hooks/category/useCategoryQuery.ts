'use client';

import { getCategories } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export const useCategoryQuery = () => {
  const pathname = usePathname();
  const getCategoriesQuery = useQuery({
    queryKey: ['categories', pathname],
    queryFn: getCategories,
  });

  return {
    category: {
      categoryList: getCategoriesQuery.data,
      loading: getCategoriesQuery.isPending,
    },
  };
};
