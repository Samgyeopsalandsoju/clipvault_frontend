'use client';

import clsx from 'clsx';
import { useClipListStore } from '@/shared/data/model/clips.store';
import { VisibilityType } from '@/shared/data/model/clips.type';
import { Card } from '@/shared/ui/shadcn';
import { VISIBILITY_LIST } from '../model/constants';

export const VisibleCategory = () => {
  const { setVisibility, visibility } = useClipListStore();
  const handleClick = (value: VisibilityType) => {
    setVisibility(value);
  };

  return (
    <Card className="flex gap-2 p-2 px-3">
      {VISIBILITY_LIST.map((item, idx) => (
        <div
          key={idx}
          className={clsx(
            'py-1 px-4 rounded-[4px] shadow-md cursor-pointer',
            visibility === item ? 'bg-[#000] text-white' : 'bg-white text-black'
          )}
          onClick={() => handleClick(item)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </div>
      ))}
    </Card>
  );
};
