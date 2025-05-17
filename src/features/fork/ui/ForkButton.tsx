import { ForkBadge } from '@/shared/ui/ForkBadge';
import { useForkClip } from '../hooks/useForkClip';
import { useSession } from 'next-auth/react';
import { useToast } from '@/shared/core/hooks';

export const ForkButton = ({
  forkedCount,
  clipId,
  isForked,
}: {
  forkedCount: number;
  clipId: number;
  isForked?: boolean;
}) => {
  const toast = useToast();
  const { data: session } = useSession();
  const { fork } = useForkClip();

  const handleFork = () => {
    if (!session) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    const result = window.confirm('해당 클립을 포크 하시겠습니까?');
    if (result) fork(clipId);
  };

  return (
    <button onClick={handleFork} disabled={isForked}>
      <ForkBadge forkedCount={forkedCount} isForked={isForked} />
    </button>
  );
};
