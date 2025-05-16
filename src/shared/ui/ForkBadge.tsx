import { Star } from 'lucide-react';

export const ForkBadge = ({ forkedCount, isForked }: { forkedCount: string; isForked: boolean }) => {
  return (
    <div className="flex items-center px-2 py-1 bg-gray-100 rounded-md">
      <Star size={14} className="text-gray-500 mr-1.5" fill="currentColor" />
      <span className="text-xs font-medium text-gray-700">{forkedCount}</span>
    </div>
  );
};
