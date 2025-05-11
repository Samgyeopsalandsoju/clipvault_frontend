import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { shareService } from '../service';
import { deleteFile } from '@/shared/core/services';
import { usePresignedUrl, useToast } from '@/shared/core/hooks';

export const useShareLinks = () => {
  const queryClient = useQueryClient();
  const { generateDeleteUrl } = usePresignedUrl();
  const toast = useToast();

  const getShareLinks = useQuery({
    queryKey: ['share-links'],
    queryFn: shareService.getShareLinks,
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
        await shareService.deleteShareLink(id);
      } catch (error) {
        console.error('Database deletion failed but S3 file was deleted:', { id, filename });
        throw new Error('Failed to update records. The file was deleted but some cleanup is needed.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['share-links'] });
      toast.success('Successfully delete share link!');
    },
    onError: () => {
      toast.error('Failed to delete is. try later..');
    },
  });

  return {
    list: getShareLinks.data ?? [],
    isLoading: getShareLinks.isPending,
    remove: deleteShareLinksMutation.mutateAsync,
  };
};
