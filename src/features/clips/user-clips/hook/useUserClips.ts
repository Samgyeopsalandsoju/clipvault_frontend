import { useQuery } from '@tanstack/react-query';
import { getUserClips } from '../service';

// 유저 클립 리스트 훅
export const useUserClips = () => {
  const getUserClipsQuery = useQuery({
    queryKey: ['user-clips'],
    queryFn: getUserClips,
  });

  return {
    data: getUserClipsQuery.data, // 데이터
    isLoading: getUserClipsQuery.isPending, // 로딩
    error: getUserClipsQuery.error, // 에러
  };
};
