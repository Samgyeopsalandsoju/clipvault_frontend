import { deleteClip, getClip, getClips, modifyClip, postClip } from '@/services/clips';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createToastService } from '@/libs/hot-toast';
import { useTheme } from 'styled-components';
import { useClipPageTransition } from './useClipPageTransition';

export const useClipQuery = (rawId?: string | string[] | undefined) => {
  const { handleClose } = useClipPageTransition();
  const theme = useTheme();
  const toast = createToastService(theme);
  // id 값 정제
  const id = useMemo(() => {
    if (!rawId) return undefined;
    return Array.isArray(rawId) ? rawId[0] : rawId;
  }, [rawId]);

  const queryClient = useQueryClient();
  const getClipsQuery = useQuery({
    queryKey: ['clips'],
    queryFn: getClips,
  });

  const createClipMutation = useMutation({
    mutationFn: postClip,
    onSuccess: () => {
      toast.success('Your insight is now clipped! ✨');
      queryClient.invalidateQueries({ queryKey: ['clips'] });
      handleClose();
    },
  });

  const getClipQuery = useQuery({
    queryKey: ['clip', id],
    queryFn: () => {
      if (!id) throw new Error('Invalid ID');
      return getClip(id);
    },
    enabled: !!id,
  });

  const modifyClipMutation = useMutation({
    mutationFn: modifyClip,
    onSuccess: () => {
      toast.success('Change is good, your clip is fresh now! ✨');
      queryClient.invalidateQueries({ queryKey: ['clips'] });
      handleClose();
    },
  });

  const deleteClipMutation = useMutation({
    mutationFn: deleteClip,
    onSuccess: () => {
      toast.success('Making space for new ideas! ✨');
      queryClient.invalidateQueries({ queryKey: ['clips'] });
      handleClose();
    },
  });

  return {
    clipList: {
      data: getClipsQuery.data ?? [],
    },
    clip: {
      data: getClipQuery.data,
      create: createClipMutation.mutate,
      modify: modifyClipMutation.mutate,
      delete: deleteClipMutation.mutate,
    },
  };
};
