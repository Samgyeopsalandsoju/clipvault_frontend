import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getClip, modifyClip } from '../service';
import { useModifyModalStore } from '../model/store';
import { useToast } from '@/shared/core/hooks';

export const useModifyClip = () => {
  const queryClient = useQueryClient();
  const clipId = useModifyModalStore((state) => state.clipId);
  const toast = useToast();

  const getClipInfoQuery = useQuery({
    queryKey: ['clip', clipId],
    queryFn: () => getClip(clipId ?? ''),
    enabled: !!clipId,
  });

  const modifyClipMutation = useMutation({
    mutationFn: modifyClip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-clips'] });
      queryClient.invalidateQueries({ queryKey: ['clip', clipId] });
      toast.success('클립이 수정되었습니다.');
    },
    onError: () => {
      toast.error('클립 수정이 실패하였습니다.');
    },
  });

  return {
    clip: getClipInfoQuery.data,
    modify: modifyClipMutation.mutate,
  };
};
