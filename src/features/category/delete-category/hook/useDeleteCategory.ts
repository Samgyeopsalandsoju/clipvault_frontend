import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '../service';
import { useToast } from '@/shared/hooks';
import { useRouter } from 'next/navigation';

export const useDeleteCategory = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success('카테고리 삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      router.push('/clips');
    },
    onError: () => {
      toast.error('카테고리 삭제 실패');
    },
  });

  return { deleteCategory: deleteCategoryMutation.mutate, isLoading: deleteCategoryMutation.isPending };
};
