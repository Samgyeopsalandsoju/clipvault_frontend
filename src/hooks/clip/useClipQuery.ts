'use client';

import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useClipPageTransition } from '@/hooks';
import { deleteClip, getClip, getClips, modifyClip, postClip } from '@/services';
import { usePathname } from 'next/navigation';
import { isModalPath } from '@/utils';
import { createToast } from '@/libs/toast';

export const useClipQuery = (rawId?: string | string[] | undefined) => {
  const { handleClose } = useClipPageTransition();
  const toast = createToast();
  const pathname = usePathname();
  const isModalOpen = isModalPath(pathname);

  // id 값 정제
  const id = useMemo(() => {
    if (!rawId) return undefined;
    return Array.isArray(rawId) ? rawId[0] : rawId;
  }, [rawId]);

  const queryClient = useQueryClient();
  // get 클립 리스트
  const getClipsQuery = useQuery({
    queryKey: ['clips'],
    queryFn: getClips,
    enabled: !isModalOpen, // isModalOpen 모달이 열려있으면 실행하지않는다.
  });

  // create clip
  const createClipMutation = useMutation({
    mutationFn: postClip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clips', 'categories'] });
      toast.success('Clip saved successfully ✨');
      handleClose();
    },
  });

  // get clip ( 단일 )
  const getClipQuery = useQuery({
    queryKey: ['clip', id],
    queryFn: () => {
      if (!id) throw new Error('Invalid ID');
      return getClip(id);
    },
    enabled: !!id, // id 갑이 있을때만 호출
  });

  // 클립 수정
  const modifyClipMutation = useMutation({
    mutationFn: modifyClip,
    onSuccess: () => {
      toast.success('Clip updated successfully ✨');
      queryClient.invalidateQueries({ queryKey: ['clips', 'clip', 'categories'] });
      handleClose();
    },
  });

  // 클립 삭제
  const deleteClipMutation = useMutation({
    mutationFn: deleteClip,
    onSuccess: () => {
      toast.success('Clip deleted successfully 🗑️');
      queryClient.invalidateQueries({ queryKey: ['clips', 'categories'] });
      handleClose();
    },
  });

  return {
    clips: {
      clipList: getClipsQuery.data ?? [],
      isClipsLoading: getClipsQuery.isPending,
    },
    clip: {
      clip: getClipQuery.data,
      isClipLoading: getClipQuery.isPending,
      create: createClipMutation.mutateAsync,
      modify: modifyClipMutation.mutate,
      delete: deleteClipMutation.mutate,
    },
  };
};
