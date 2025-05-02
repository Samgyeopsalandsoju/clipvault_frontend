'use client';

import { useClipListStore } from '@/shared/model/clips.store';
import { Card } from '@/shared/ui/card';
import { HashTag } from '@/shared/ui/HashTag';
import { CreateButton } from '../../create-button/ui/CreateButton';
import { MobileCreateButton } from '../../create-button/ui/MobileCreateButton';

export const ClipPanel = () => {
  const { visibility, category } = useClipListStore();

  return (
    <Card className="p-4">
      <div className="flex flex-row gap-3 pl-4 items-center lg:justify-between">
        <div className="flex">
          <p className="pr-3">filter:</p>
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
