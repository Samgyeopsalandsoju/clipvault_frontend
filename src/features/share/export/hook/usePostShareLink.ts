import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/shared/core/hooks';
import { addItemWithLimit } from '../model/util';
import { uploadShareLink } from '../service';

export const usePostShareLink = () => {
  const toast = useToast();

  const uploadShareLinkMutation = useMutation({
    mutationFn: uploadShareLink,
    onSuccess: ({ body, status }) => {
      if (status) {
        toast.success('Successfully create share link!');
      } else {
        const { message } = addItemWithLimit(body);
        toast.error(message);
      }
    },
  });

  return {
    postShareLink: uploadShareLinkMutation.mutateAsync,
    isLoading: uploadShareLinkMutation.isPending,
  };
};
