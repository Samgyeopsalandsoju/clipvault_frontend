'use client';

import { fetchSharedLinkList, uploadShareLink } from '@/services';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useShareLink = () => {
  const uploadShareLinkMutation = useMutation({
    mutationFn: uploadShareLink,
    onSuccess: () => {},
  });

  const getShareLinksQuery = useQuery({
    queryKey: ['shareLinkList'],
    queryFn: fetchSharedLinkList,
  });

  return {
    shareLinks: {
      data: getShareLinksQuery.data || [],
      isLoading: getShareLinksQuery.isPending,
    },
    postShareLink: uploadShareLinkMutation.mutateAsync,
  };
};
