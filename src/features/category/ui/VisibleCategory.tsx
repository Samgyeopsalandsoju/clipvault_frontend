'use client';

import { Card } from '@/shared/ui/card';
import clsx from 'clsx';
import { useClipListStore } from '@/features/clips/user-clips/model/store';
import { VisibilityType } from '@/features/clips/user-clips/model/type';

const VisibleCategory = () => {
  const { setVisibility, visibility } = useClipListStore();
  const handleClick = (value: VisibilityType) => {
    setVisibility(value);
  };

  return (
    <Card className="flex gap-2 p-3">
      <div
        className={clsx(
          'p-2 px-4 bg-white rounded-[4px] shadow-md cursor-pointer',
          visibility === 'all' && 'bg-[#000] text-white'
        )}
        onClick={() => handleClick('all')}
      >
        All
      </div>
      <div
        className={clsx(
          'p-2 px-4 bg-white rounded-[4px] shadow-md cursor-pointer',
          visibility === 'public' && 'bg-[#000] text-white'
        )}
        onClick={() => handleClick('public')}
      >
        Public
      </div>
      <div
        className={clsx(
          'p-2 px-4 bg-white rounded-[4px] shadow-md cursor-pointer',
          visibility === 'private' && 'bg-[#000] text-white'
        )}
        onClick={() => handleClick('private')}
      >
        Private
      </div>
    </Card>
  );
};

export default VisibleCategory;
