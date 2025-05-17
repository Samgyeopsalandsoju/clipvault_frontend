'use client';

import { ColorPicker } from '@/shared/color-palette/ui/ColorPicker';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, Button, Input, Label } from '@/shared/ui/shadcn';
import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ICategoryForm } from '../model/types';
import { useCreateCategory } from '../hooks/useCreateCategory';

// 카테고리 생성 모달
export const CreateCategory = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
    reset,
  } = useForm<ICategoryForm>({ mode: 'onChange' });
  const [color, setColor] = useState<string>('');
  const { postCategory, isLoading } = useCreateCategory();

  const selectColor = (newColor: string) => {
    // newColor가 설정되어있다면 set 하고 에러 클리어
    if (newColor.length > 0) {
      setColor(newColor);
      setValue('color', newColor);
      clearErrors('color');
    }
  };

  const onSubmit = (data: ICategoryForm) => {
    if (color.length === 0) {
      setError('color', { message: '색상을 선택해 주세요.' });
      return;
    }
    postCategory(data, {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
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
        <form className="flex flex-col gap-6 w-full px-4 lg:w-[40vw] py-4" onSubmit={handleSubmit(onSubmit)}>
          {/** 카테고리 이름*/}
          <div className="grid gap-2 ">
            <Label htmlFor="title">카테고리 이름</Label>
            <Input
              id="categoryName"
              type="text"
              placeholder="카테고리"
              {...register('name', { required: '카테고리 이름을 입력해주세요.' })}
            />
            <span className="text-sm text-red-500 h-3">{errors?.name?.message || ' '}</span>
          </div>

          {/** 색상 선택 링크*/}
          <div className="grid gap-2 ">
            <Label htmlFor="title">카테고리 색상</Label>
            <ColorPicker color={color} setColor={selectColor} />{' '}
            <span className="text-sm text-red-500 h-3">{errors?.color?.message || ' '}</span>
          </div>

          <Button type="submit" disabled={isLoading}>
            카테고리 생성
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
