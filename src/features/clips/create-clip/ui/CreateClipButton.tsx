'use client';

import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { CreateDrawer } from './CreateDrawer';

export const CreateClipButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button className="text-xs p-2" onClick={() => setIsOpen(true)}>
        Create Clip
      </Button>
      <CreateDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
