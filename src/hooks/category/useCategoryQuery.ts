'use client';

import { deleteCategory, getCategories, postCategories } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useCategoryQuery = () => {
  const queryClient = useQueryClient();
  const [isPosting, setIsPosting] = useState(false);

  const postCategoryMutation = useMutation({
    mutationFn: postCategories,
    onMutate: () => {
      setIsPosting(true); // ✅ post 시작할 때 상태 변경
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
      await queryClient.invalidateQueries({ queryKey: ['clips'] });
      await queryClient.refetchQueries({ queryKey: ['categories'] });
      await queryClient.refetchQueries({ queryKey: ['clips'] });
      console.log('postCategoryMutation success');
      setIsPosting(false);
    },
    onError: () => {
      console.log('postCategoryMutation error');
      setIsPosting(false);
    },
  });

  const getCategoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    enabled: !postCategoryMutation.isPending,
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
      isPending: postCategoryMutation.isPending,
    },
  };
};
