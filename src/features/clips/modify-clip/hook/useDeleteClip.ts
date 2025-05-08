import { useToast } from '@/shared/core/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteClip } from '../service';

export const useDeleteClip = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const deleteClipMutation = useMutation({
    mutationFn: deleteClip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-clips'] });
      toast.success('클립이 삭제되었습니다.');
    },
    onError: () => {
      toast.error('클립 삭제에 실패했습니다.');
    },
  });

  return { deleteClip: deleteClipMutation.mutate, isLoading: deleteClipMutation.isPending };
};
