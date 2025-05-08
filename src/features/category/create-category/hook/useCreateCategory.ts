import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCategory } from '../service';
import { useToast } from '@/shared/core/hooks';
import { ICategoryForm } from '../model/type';
import { generateUniqueId } from '@/shared/utils/uuid';

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
