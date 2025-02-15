import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useClipPageTransition } from '@/hooks';
import { createToast } from '@/libs';
import { deleteClip, getClip, getClips, modifyClip, postClip } from '@/services';
import { usePathname } from 'next/navigation';
import { isModalPath } from '@/utils';

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
    enabled: !isModalOpen,
  });

  // create clip
  const createClipMutation = useMutation({
    mutationFn: postClip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clips'] });
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
    enabled: !!id,
  });

  // 클립 수정
  const modifyClipMutation = useMutation({
    mutationFn: modifyClip,
    onSuccess: () => {
      toast.success('Clip updated successfully ✨');
      queryClient.invalidateQueries({ queryKey: ['clips', 'clip'] });
      handleClose();
    },
  });

  // 클립 삭제
  const deleteClipMutation = useMutation({
    mutationFn: deleteClip,
    onSuccess: () => {
      toast.success('Clip deleted successfully 🗑️');
      queryClient.invalidateQueries({ queryKey: ['clips'] });
      handleClose();
    },
  });

  return {
    clips: {
      clipList: getClipsQuery.data ?? [],
      isClipsLoading: getClipsQuery.isPending,
    },
    clip: {
      data: getClipQuery.data,
      create: createClipMutation.mutate,
      modify: modifyClipMutation.mutate,
      delete: deleteClipMutation.mutate,
    },
  };
};
