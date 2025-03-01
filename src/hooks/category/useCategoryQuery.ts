'use client';

import { deleteCategory, getCategories, postCategories } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useCategoryQuery = () => {
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const getCategoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const postCategoryMutation = useMutation({
    mutationFn: postCategories,
    onMutate: () => {
      setIsPosting(true);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['clips'] });
      console.log('postCategoryMutation success');
      setIsPosting(false);
      await queryClient.refetchQueries({ queryKey: ['categories'] });
      await queryClient.refetchQueries({ queryKey: ['clips'] });
    },
    onError: () => {
      console.log('postCategoryMutation error');
      setIsPosting(false);
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
      isPosting,
    },
  };
};
