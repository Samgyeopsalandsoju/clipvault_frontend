'use client';

import { deleteCategory, getCategories, postCategories } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export const useCategoryQuery = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const getCategoriesQuery = useQuery({
    queryKey: ['categories', pathname],
    queryFn: getCategories,
  });

  const postCategoryMutation = useMutation({
    mutationFn: postCategories,
    onSuccess: () => {
      console.log('postCategoryMutation success');
    },
    onError: () => {
      console.log('postCategoryMutation error');
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      console.log('deleteCategoryMutation success');
    },
    onError: () => {
      console.log('deleteCategoryMutation error');
    },
  });

  return {
    category: {
      categoryList: getCategoriesQuery.data,
      loading: getCategoriesQuery.isPending,
      post: postCategoryMutation.mutate,
      remove: deleteCategoryMutation.mutate,
    },
  };
};
