import { getClip, getClips, postClip } from '@/services/clips';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useClip = (rawId?: string | string[] | undefined) => {
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
    onSuccess: (data) => {
      console.log('데이터 추가에 성공 하였습니다.', data);
      queryClient.invalidateQueries({ queryKey: ['clips'] });
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

  return {
    clipList: {
      data: getClipsQuery.data ?? [],
    },
    clip: {
      data: getClipQuery.data,
      create: createClipMutation.mutate,
    },
  };
};
