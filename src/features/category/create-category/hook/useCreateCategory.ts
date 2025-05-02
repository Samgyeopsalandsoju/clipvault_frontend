import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCategory } from '../service';
import { useToast } from '@/shared/hooks';

export const useCreateCategory = () => {
  const toast = useToast();

  const queryClient = useQueryClient();
  const postCategoryMutation = useMutation({
    mutationFn: postCategory,
    onSuccess: () => {
      // 카테고리 목록 조회 캐시 최신화
      queryClient.invalidateQueries({ queryKey: ['category'] });
      toast.success('카테고리 생성 완료');
    },
    onError: (error) => {
      toast.error('카테고리 생성 실패');
    },
  });

  return { postCategory: postCategoryMutation.mutate, isLoading: postCategoryMutation.isPending };
};
