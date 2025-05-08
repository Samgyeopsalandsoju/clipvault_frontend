import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modifyCategory } from '../service';
import { useToast } from '@/shared/core/hooks';

export const useModifyCategory = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const modifyCategoryMutation = useMutation({
    mutationFn: modifyCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('카테고리 수정 완료');
    },
    onError: (error) => {
      console.log(error);
      toast.error('카테고리 수정 실패');
    },
  });

  return { modify: modifyCategoryMutation.mutate, isLoading: modifyCategoryMutation.isPending };
};
