import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCategory } from '../service';

export const usePostCategory = () => {
  const queryClient = useQueryClient();
  const postCategoryMutation = useMutation({
    mutationFn: postCategory,
    onSuccess: () => {
      // 카테고리 목록 조회 캐시 최신화
      queryClient.invalidateQueries({ queryKey: ['category'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { postCategory: postCategoryMutation.mutate, isLoading: postCategoryMutation.isPending };
};
