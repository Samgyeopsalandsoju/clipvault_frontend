'use client';

import { createToast } from '@/libs/toast';
import { deleteCategory, getCategories, postCategories } from '@/services';
import { ICategoryRequest } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useCategoryQuery = () => {
  const toast = createToast();
  const queryClient = useQueryClient();

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
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 0, // 항상 최신 데이터를 요청
    refetchOnMount: 'always', // 컴포넌트 마운트시 항상 리페치
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
