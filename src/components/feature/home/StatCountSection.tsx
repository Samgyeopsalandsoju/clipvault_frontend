import { StatCount } from '@/components/ui/stats/StatCount';
import { useStateQuery } from '@/hooks';

export const StatCountSection = () => {
  const { clipCount, shareCount } = useStateQuery();

  return (
    <div className="flex items-center justify-evenly">
      <StatCount title={'Total Clips'} count={clipCount || '0'} />
      <StatCount title={'Total Shared'} count={shareCount || '0'} />
    </div>
  );
};
