import { deleteClip, getClip, getClips, modifyClip, postClip } from '@/services/clipsService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useClipPageTransition } from './useClipPageTransition';
import { useToast } from '../useToast';

export const useClipQuery = (rawId?: string | string[] | undefined) => {
  const { handleClose } = useClipPageTransition();
  const { successToast } = useToast();
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
      successToast('Clip saved successfully ✨');
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
      successToast('Clip updated successfully ✨');
      queryClient.invalidateQueries({ queryKey: ['clips', 'clip'] });
      handleClose();
    },
  });

  const deleteClipMutation = useMutation({
    mutationFn: deleteClip,
    onSuccess: () => {
      successToast('Clip deleted successfully 🗑️');
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
