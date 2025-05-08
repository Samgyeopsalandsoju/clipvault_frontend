'use client';

import { useClipListStore } from '@/shared/data/model/clips.store';
import { HashTag } from '@/shared/ui/HashTag';
import { CreateButton } from '../../create-button/ui/CreateButton';
import { Card } from '@/shared/ui/shadcn';

export const ClipPanel = () => {
  const { visibility, category } = useClipListStore();

  return (
    <Card className="p-4">
      <div className="flex flex-row gap-3 pl-4 items-center lg:justify-between">
        <div className="flex">
          <HashTag name={visibility} />,
          <HashTag name={category} />
        </div>
        <div className="hidden gap-2 hidden lg:flex">
          <CreateButton />
        </div>
      </div>
    </Card>
  );
};
