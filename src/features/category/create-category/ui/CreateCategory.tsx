'use client';

import { ColorPicker } from '@/shared/color-palette/ui/ColorPicker';
import { Button } from '@/shared/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/shared/ui/drawer';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import clsx from 'clsx';
import { useState } from 'react';
import { useCreateCategory } from '../hook/useCreateCategory';
import { ICategoryForm } from '../model/type';
import { useForm } from 'react-hook-form';

// 카테고리 생성 모달
export const CreateCategory = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategoryForm>();
  const [color, setColor] = useState<string>('');
  const { postCategory } = useCreateCategory();

  const onSubmit = (data: ICategoryForm) => {
    postCategory(data);
  };

  // 닫기 핸들러
  const handleClose = () => {
    onClose();
  };
  console.log(color);
  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent
        className={clsx(
          'flex justify-center items-center m-auto w-full',
          'md:w-[600px]',
          'lg:w-[800px]'
        )}
      >
        <DrawerHeader>
          <DrawerTitle>Create category</DrawerTitle>
        </DrawerHeader>
        <form
          className="flex flex-col gap-6 w-full px-4 lg:w-[40vw] py-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/** 카테고리 이름*/}
          <div className="grid gap-2 ">
            <Label htmlFor="title">카테고리 이름</Label>
            <Input id="title" type="text" placeholder="카테고리" {...register('categoryName')} />
          </div>

          {/** 색상 선택 링크*/}
          <div className="grid gap-2 ">
            <Label htmlFor="title">카테고리 색상</Label>
            <ColorPicker color={color} setColor={setColor} />
          </div>

          <Button type="submit">카테고리 생성</Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
