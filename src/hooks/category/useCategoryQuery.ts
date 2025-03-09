'use client';

import { createToast } from '@/libs/toast';
import { deleteCategory, getCategories, postCategories } from '@/services';
import { addItemWithLimit } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export const useCategoryQuery = () => {
  const toast = createToast();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const postCategoryMutation = useMutation({
    mutationFn: postCategories,
    onSuccess: ({ code }) => {
      const isSuccess = addItemWithLimit(code);
      if (isSuccess) {
        toast.success('Successfully upload categories!');
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        queryClient.invalidateQueries({ queryKey: ['clips'] });
      }
    },
    onError: () => {
      console.log('postCategoryMutation error');
    },
  });

  const getCategoriesQuery = useQuery({
    queryKey: ['categories', pathname],
    queryFn: getCategories,
    staleTime: 0,
    refetchOnMount: 'always',
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
    refetch: getCategoriesQuery.refetch,
  };
};
