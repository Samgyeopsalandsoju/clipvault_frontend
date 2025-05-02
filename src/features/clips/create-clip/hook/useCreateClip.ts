import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClip } from '../service';
import { useToast } from '@/shared/hooks';
import { ICreateForm } from '../model/type';

export const useCreateClip = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const createClipMutation = useMutation({
    mutationFn: createClip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-clips'] });
      toast.success('클립이 생성되었습니다.');
    },
    onError: () => {
      toast.error('클립 생성에 실패했습니다.');
    },
  });

  return {
    createClip: createClipMutation.mutate,
  };
};
