'use client';

import { deleteCategory, getCategories, postCategories } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useCategoryQuery = () => {
  const queryClient = useQueryClient();

  const getCategoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const postCategoryMutation = useMutation({
    mutationFn: postCategories,
    onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['clips'] });
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
