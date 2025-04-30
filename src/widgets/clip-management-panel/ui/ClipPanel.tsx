'use client';

import { useClipListStore } from '@/shared/model/clips.store';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { HashTag } from '@/shared/ui/HashTag';
import { CreateClipButton } from '@/features/clips/create-clip/ui/CreateClipButton';
export const ClipPanel = () => {
  const { visibility, category } = useClipListStore();
  return (
    <Card className="p-2">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-3 p-2 items-center lg:justify-between">
        <div className="flex order-2 lg:order-1">
          {visibility !== 'all' && <HashTag name={visibility} />}
          {category !== 'all' && <HashTag name={category} />}
        </div>
        <div className="flex gap-2 order-1 lg:order-2">
          <Button variant="outline" className="text-xs p-2">
            Share list
          </Button>
          <CreateClipButton />
        </div>
      </div>
    </Card>
  );
};
