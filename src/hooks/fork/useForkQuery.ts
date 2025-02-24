'use client';

import { deleteForkedClip, getForkedList, postFork } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export const useForkQuery = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const doForkMutation = useMutation({
    mutationFn: postFork,
    onSuccess: () => {
      console.log('Success doForkMutation');
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
    doFork: doForkMutation.mutate,
    isForking: doForkMutation.isPaused,
    list: forkedListQuery.data ?? [],
    deleteFork: deleteForkedClipMutation.mutate,
  };
};
