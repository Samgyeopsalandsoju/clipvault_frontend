'use client';

import { ColorPicker } from '@/shared/color-palette/ui/ColorPicker';
import { Button } from '@/shared/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/shared/ui/drawer';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// 카테고리 생성 모달
export const ModifyCategory = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [color, setColor] = useState<string>('');

  const selectColor = (newColor: string) => {
    // newColor가 설정되어있다면 set 하고 에러 클리어
    if (newColor.length > 0) {
      setColor(newColor);
    }
  };

  // 닫기 핸들러
  const handleClose = () => {
    onClose();
  };
  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent className={clsx('flex justify-center items-center m-auto w-full', 'md:w-[600px]', 'lg:w-[800px]')}>
        <DrawerHeader>
          <DrawerTitle>Create category</DrawerTitle>
        </DrawerHeader>
        <form className="flex flex-col gap-6 w-full px-4 lg:w-[40vw] py-4">
          {/** 카테고리 이름*/}
          <div className="grid gap-2 ">
            <Label htmlFor="title">카테고리 이름</Label>
            <Input id="categoryName" type="text" placeholder="카테고리" />
          </div>

          {/** 색상 선택 링크*/}
          <div className="grid gap-2 ">
            <Label htmlFor="title">카테고리 색상</Label>
            <ColorPicker color={color} setColor={selectColor} />{' '}
          </div>

          <Button type="submit">카테고리 수정</Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
