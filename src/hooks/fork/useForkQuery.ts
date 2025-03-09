'use client';

import { createToast } from '@/libs/toast';
import { deleteForkedClip, getForkedList, postFork } from '@/services';
import { authRef } from '@/stores';
import { IClipResponse, IDoForkRequest } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useAuthModal } from '../auth';

export const useForkQuery = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const toast = createToast();
  const { setIsAuthModalOpen } = useAuthModal();

  const doForkMutation = useMutation({
    mutationFn: (data: IDoForkRequest) => {
      const checkIsAuthenticated = () => authRef.isAuthenticated;
      const isCurrentlyAuthenticated = checkIsAuthenticated();

      if (!isCurrentlyAuthenticated) {
        toast.info('Please log in to fork this clip to your favorites.');
        setIsAuthModalOpen(true);
        return Promise.reject(new Error('Authentication required'));
      }

      return postFork(data);
    },
    onMutate: async (id) => {
      const previousForkedIds = (queryClient.getQueryData(['homeForked']) as number[]) || [];
      const isCurrentlyForked = previousForkedIds.includes(Number(id.clipId));
      const newForkedList = !isCurrentlyForked ? [...previousForkedIds, id.clipId] : [...previousForkedIds];
      queryClient.setQueryData(['homeForked'], newForkedList);

      queryClient.setQueryData(['homeClip'], (oldList: IClipResponse[] = []) => {
        return oldList.map((clip) => {
          if (clip.id === id.clipId) {
            return {
              ...clip,
              forkedCount: isCurrentlyForked ? clip.forkedCount : clip.forkedCount + 1,
              isForked: true,
            };
          }
          return clip;
        });
      });
    },
    onSuccess: ({ body: code }, { clipId }) => {
      if (code === '5006' || code === '99999') {
        const previousForkedIds = (queryClient.getQueryData(['homeForked']) as number[]) || [];
        const newForkedList = previousForkedIds.filter((id) => id !== Number(clipId));
        queryClient.setQueryData(['homeForked'], newForkedList);
        queryClient.setQueryData(['homeClip'], (oldList: IClipResponse[] = []) => {
          return oldList.map((clip) => {
            if (clip.id === clipId) {
              return {
                ...clip,
                forkedCount: Number(clip.forkedCount) - 1,
                isForked: false,
              };
            }
            return clip;
          });
        });
        const errorMessage = code === '5006' ? 'This is your clip.' : 'Generation limit exceeded.';

        toast.error(errorMessage);
      } else {
        console.log('Success doForkMutation');
      }
      queryClient.invalidateQueries({ queryKey: ['clip'] });
    },
    onError: () => {
      console.log('Error doForkMutation');
    },
  });

  const forkedListQuery = useQuery({
    queryKey: ['forkedList'],
    queryFn: getForkedList,
    enabled: pathname.startsWith('/fork'),
  });

  const deleteForkedClipMutation = useMutation({
    mutationFn: deleteForkedClip,
    onSuccess: () => {
      console.log('Success deleteForkedClipMutation');
      queryClient.invalidateQueries({ queryKey: ['forkedList'] });
    },
    onError: () => {
      console.log('Error deleteForkedClipMutation');
    },
  });

  return {
    doFork: doForkMutation.mutateAsync,
    isForking: doForkMutation.isPaused,
    list: forkedListQuery.data ?? [],
    isClipLoading: forkedListQuery.isPending,
    deleteFork: deleteForkedClipMutation.mutate,
  };
};
