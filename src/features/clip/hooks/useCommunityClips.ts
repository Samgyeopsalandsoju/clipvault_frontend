import { useQuery } from '@tanstack/react-query';
import { getCommunityClips, getForkedClipIds } from '../service';
import { useSession } from 'next-auth/react';

// 홈 클립 리스트 훅
export const useCommunityClips = () => {
  const { data: session, status } = useSession();

  const getCommunityClipsQuery = useQuery({
    queryKey: ['public-clips'],
    queryFn: getCommunityClips,
    // 브라우저로 다시 돌아올떄마다 리 패치 x
    refetchOnWindowFocus: false,
  });

  // 커뮤니티 페이지에 내가 포크한 클립이있는지 확인
  const getForkedClipIdsQuery = useQuery({
    queryKey: ['forked-ids'],
    queryFn: getForkedClipIds,
    enabled: !!session?.accessToken && status === 'authenticated',
  });

  return {
    clips: getCommunityClipsQuery.data ?? [], // 데이터
    ids: getForkedClipIdsQuery.data ?? [],
    isLoading: getCommunityClipsQuery.isPending, // 로딩
    error: getCommunityClipsQuery.error, // 에러
  };
};
