import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/core/hooks';
import { useModifyClipModalStore } from '../model/stores';
import { getClip, modifyClip } from '../service';

export const useModifyClip = () => {
  const queryClient = useQueryClient();
  const clipId = useModifyClipModalStore((state) => state.clipId);
  const toast = useToast();

  const getClipInfoQuery = useQuery({
    queryKey: ['clip', clipId],
    queryFn: () => getClip(clipId ?? 0),
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
