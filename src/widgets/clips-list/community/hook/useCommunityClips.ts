import { useQuery } from '@tanstack/react-query';
import { getCommunityClips } from '../service';

// 홈 클립 리스트 훅
export const useCommunityClips = () => {
  const getCommunityClipsQuery = useQuery({
    queryKey: ['public-clips'],
    queryFn: getCommunityClips,
    // 브라우저로 다시 돌아올떄마다 리 패치 x
    refetchOnWindowFocus: false,
  });

  return {
    data: getCommunityClipsQuery.data, // 데이터
    isLoading: getCommunityClipsQuery.isPending, // 로딩
    error: getCommunityClipsQuery.error, // 에러
  };
};
