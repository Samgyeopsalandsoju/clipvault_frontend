'use client';

import { useClipListStore } from '@/features/clips/user-clips/model/store';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { HashTag } from '@/shared/ui/HashTag';
import Tag from '@/shared/ui/Tag';

export const ClipPanel = () => {
  const { visibility, category } = useClipListStore();
  return (
    <Card className="p-5">
      <div className="flex gap-3 justify-between">
        <div className="flex">
          {visibility !== 'all' && <HashTag name={visibility} />}
          {category.name !== 'all' && <HashTag name={category.name} />}
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Share list</Button>
          <Button>Create clip</Button>
        </div>
      </div>
    </Card>
  );
};
