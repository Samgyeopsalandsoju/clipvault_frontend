'use client';

import { createToast } from '@/libs/toast';
import { deleteCategory, getCategories, postCategories } from '@/services';
import { ICategoryRequest } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export const useCategoryQuery = () => {
  const toast = createToast();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const postCategoryMutation = useMutation({
    mutationFn: async (data: ICategoryRequest[]): Promise<any> => {
      return toast.promise(postCategories(data), {
        loading: 'Adding category...',
        success: 'Category added successfully',
        error: 'Failed to add category. Please try again.',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['clips'] });
      console.log('postCategoryMutation success');
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
