import { CreateCategory } from '@/features/category/create-category/ui/CreateCategory';
import { CreateClip } from '@/features/clips/create-clip/ui/CreateClip';
import { Button } from '@/shared';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';
import { useState } from 'react';

export const CreateButton = () => {
  // clip 생성 모달 오픈
  const [isOpenClip, setIsOpenClip] = useState<boolean>(false);
  // category 생성 모달 오픈
  const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Create</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end" sideOffset={5}>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setIsOpenCategory(true)}>
              create category
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setIsOpenClip(true)}>create clip</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateClip isOpen={isOpenClip} onClose={() => setIsOpenClip(false)} />
      <CreateCategory isOpen={isOpenCategory} onClose={() => setIsOpenCategory(false)} />
    </>
  );
};
