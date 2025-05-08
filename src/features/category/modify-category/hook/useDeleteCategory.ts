import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '../service';
import { useToast } from '@/shared/core/hooks';

export const useDeleteCategory = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('카테고리가 성공적으로 삭제되었습니다.');
    },
    onError: () => {
      toast.error('카테고리 삭제에 실패했습니다.');
    },
  });

  return { removeCategory: deleteCategoryMutation.mutate, isLoading: deleteCategoryMutation.isPending };
};
