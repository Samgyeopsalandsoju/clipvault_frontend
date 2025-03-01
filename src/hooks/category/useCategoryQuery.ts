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
      await queryClient.refetchQueries({ queryKey: ['categories'] });
      await queryClient.refetchQueries({ queryKey: ['clips'] });

      setTimeout(() => {
        setIsPosting(false); // ✅ isPosting 변경을 살짝 늦춰서 `useEffect`가 순서대로 실행되게 만듦
      }, 100);
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
