import { Star } from 'lucide-react';

export const ForkBadge = ({ forkedCount, isForked = false }: { forkedCount: number; isForked?: boolean }) => {
  return (
    <div className="flex items-center space-x-1 group transition-colors">
      <Star
        size={18}
        className={`transition-colors ${
          isForked ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400 group-hover:text-yellow-400'
        }`}
      />
      <span
        className={`text-sm font-medium ${isForked ? 'text-yellow-600' : 'text-gray-500 group-hover:text-yellow-600'}`}
      >
        {forkedCount}
      </span>
    </div>
  );
};
