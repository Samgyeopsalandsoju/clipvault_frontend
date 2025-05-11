'use client';
import { CreateCategory } from '@/features/category/post-category/ui/CreateCategory';
import { CreateClip } from '@/features/clip/create-clip/ui/CreateClip';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/shared/ui/shadcn';
import { useState } from 'react';
import { Plus } from 'lucide-react';

export const MobileCreateButton = () => {
  // clip 생성 모달 오픈
  const [isOpenClip, setIsOpenClip] = useState<boolean>(false);
  // category 생성 모달 오픈
  const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);

  return (
    <div className="fixed bottom-5 right-5 lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="p-2 rounded-full bg-black shadow-md">
            <Plus className="text-white" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end" sideOffset={5}>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setIsOpenCategory(true)}>create category</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setIsOpenClip(true)}>create clip</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateClip isOpen={isOpenClip} onClose={() => setIsOpenClip(false)} />
      <CreateCategory isOpen={isOpenCategory} onClose={() => setIsOpenCategory(false)} />
    </div>
  );
};
