import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFork } from '../service';
import { IClip } from '@/shared/data/types';
import { useToast } from '@/shared/core/hooks';

export const useForkClip = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const forkMutation = useMutation({
    mutationFn: createFork,
    onMutate: (id) => {
      // 이미 포크한 클립 아이디 리스트
      const prevForkedIds = queryClient.getQueryData(['forked-ids']) as string[];
      const previousClips = queryClient.getQueryData(['public-clips']) || [];
      // 포크 시도한 id 리스트에 추가
      queryClient.setQueryData(['forked-ids'], [...prevForkedIds, id]);
      // 현재 community clips UI 낙관적 업데이트
      queryClient.setQueryData(['public-clips'], (oldList: IClip[]) => {
        return oldList.map((clip) => {
          if (clip.id === id) {
            return {
              ...clip,
              forkedCount: clip.forkedCount + 1,
              isForked: true,
            };
          }
          return clip;
        });
      });
      return { prevForkedIds, previousClips };
    },
    onSuccess: ({ body: code }, id) => {
      // 실패한 경우 롤백 (이미 내 클립이거나 한도 초과)
      if (code === '5006' || code === '99999') {
        // 낙관적 업데이트 했던 클립 아이디 롤백
        queryClient.setQueryData(['forked-ids'], (ids: number[]) => ids.filter((forkedId) => forkedId !== id));

        queryClient.setQueryData(['public-clips'], (clips: IClip[]) => {
          return clips.map((clip) =>
            clip.id === id ? { ...clip, forkedCount: Math.max(0, +clip.forkedCount - 1), isForked: false } : clip
          );
        });
        toast.error(code === '5006' ? '자신의 클립은 포크할 수 없습니다.' : '포크할 수 있는 수를 초과하였습니다.');
      } else {
        toast.success('해당 클립을 포크 했습니다!');
      }
    },
    onError: (err, variables, context) => {
      // 오류 발생 시 이전 상태로 복원
      if (context) {
        queryClient.setQueryData(['forked-ids'], context.prevForkedIds);
        queryClient.setQueryData(['public-clips'], context.previousClips);
      }
      toast.error('클립 포크에 실패하였습니다.');
    },
  });

  return {
    fork: forkMutation.mutate,
    isLoading: forkMutation.isPending,
  };
};
