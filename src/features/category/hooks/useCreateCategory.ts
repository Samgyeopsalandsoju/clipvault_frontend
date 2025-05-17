import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/core/hooks';
import { generateUniqueId } from '@/shared/core/utils/uuid';
import { postCategory } from '../service';
import { ICategoryForm } from '../model/types';

export const useCreateCategory = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const postCategoryMutation = useMutation({
    mutationFn: (category: ICategoryForm) => {
      return postCategory({ ...category, id: generateUniqueId() });
    },
    onSuccess: () => {
      // 카테고리 목록 조회 캐시 최신화
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('카테고리 생성 완료');
    },
    onError: () => {
      toast.error('카테고리 생성 실패');
    },
  });

  return { postCategory: postCategoryMutation.mutate, isLoading: postCategoryMutation.isPending };
};
