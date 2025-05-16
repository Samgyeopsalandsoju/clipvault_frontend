import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFork } from '../service';
import { useToast } from '@/shared/core/hooks';

export const useDeleteFork = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const deleteForkMutation = useMutation({
    mutationFn: deleteFork,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fork-list'] });
      toast.success('포크가 삭제되었습니다.');
    },
    onError: () => {
      toast.error('포크 삭제에 실패하였습니다. 잠시후 다시 시도해 주세요.');
    },
  });

  return {
    deleteFork: deleteForkMutation.mutate,
    isLoading: deleteForkMutation.isPending,
  };
};
