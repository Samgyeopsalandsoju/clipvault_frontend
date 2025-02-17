'use client';

import { createToast } from '@/libs';
import { deleteFile, deleteShareLink, fetchSharedLinkList, uploadShareLink } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePresignedUrl } from '../usePresignedUrl';

export const useShareLink = () => {
  const toast = createToast();
  const queryClient = useQueryClient();
  const { generateDeleteUrl } = usePresignedUrl();

  const uploadShareLinkMutation = useMutation({
    mutationFn: uploadShareLink,
    onSuccess: () => {
      toast.success('Successfully create share link!');
    },
  });

  const getShareLinksQuery = useQuery({
    queryKey: ['shareLinkList'],
    queryFn: fetchSharedLinkList,
  });

  const deleteShareLinksMutation = useMutation({
    mutationFn: async ({ id, link }: { id: string; link: string }) => {
      const filename = link.split('/').pop();
      if (!filename) {
        throw new Error('Invalid filename');
      }
      try {
        const deleteUrl = await generateDeleteUrl(filename);
        await deleteFile(deleteUrl);
      } catch (error) {
        throw new Error('Failed to delete file from storage. Please try again.');
      }
      try {
        await deleteShareLink(id);
      } catch (error) {
        console.error('Database deletion failed but S3 file was deleted:', { id, filename });
        throw new Error('Failed to update records. The file was deleted but some cleanup is needed.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shareLinkList'] });
      toast.success('Successfully delete share link!');
    },
    onError: () => {
      console.log('delete 실패');
      toast.error('Failed to delete is. try later..');
    },
  });

  return {
    shareLinks: {
      data: getShareLinksQuery.data || [],
      isLoading: getShareLinksQuery.isPending,
    },
    postShareLink: uploadShareLinkMutation.mutateAsync,
    deleteShareLink: deleteShareLinksMutation.mutateAsync,
  };
};
