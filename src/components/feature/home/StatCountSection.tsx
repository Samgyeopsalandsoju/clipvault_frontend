import { StatCount } from '@/components/ui';

export const StatCountSection = () => {
  return (
    <div className="flex items-center justify-evenly">
      <StatCount title={'Total Clips'} count={10} />
      <StatCount title={'Total Shared'} count={20} />
    </div>
  );
};
