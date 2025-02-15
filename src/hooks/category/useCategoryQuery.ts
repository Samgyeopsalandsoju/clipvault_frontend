import { getCategories } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useCategoryQuery = () => {
  const getCategoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return {
    category: {
      categoryList: getCategoriesQuery.data,
      loading: getCategoriesQuery.isPending,
    },
  };
};
