'use client';

import { ColorPicker } from '@/shared/color-palette/ui/ColorPicker';
import { Button } from '@/shared/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/shared/ui/drawer';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useModifyModalStore } from '../model/store';
import { useForm } from 'react-hook-form';
import { ICategory } from '@/shared/types';
import { useModifyCategory } from '../hook/useModifyCategory';

// 카테고리 생성 모달
export const ModifyCategory = () => {
  // 모달 오픈
  const isOpen = useModifyModalStore((state) => state.isOpen);
  const setIsOpen = useModifyModalStore((state) => state.setIsOpen);

  // 카테고리
  const category = useModifyModalStore((state) => state.category);
  // 변경 색상
  const [color, setColor] = useState<string>('');

  // 수정 카테고리 훅
  const { modify, isLoading } = useModifyCategory();
  // 폼 데이터
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ICategory>();

  // 카테고리 정보 초기 설정
  useEffect(() => {
    if (category) {
      setValue('id', category.id);
      setValue('name', category.name);
      setValue('color', category.color);
      setColor(category.color);
    }
  }, [category]);

  // 색상 선택
  const selectColor = (newColor: string) => {
    // newColor가 설정되어있다면 set 하고 에러 클리어
    if (newColor.length > 0) {
      setColor(newColor);
      setValue('color', newColor);
      clearErrors('color');
    }
  };

  // 폼 제출
  const onSubmit = (data: ICategory) => {
    if (color.length === 0) {
      setError('color', { message: '색상을 선택해주세요.' });
      return;
    }

    modify(data, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  // 모달 닫기 및 값 초기화
  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent className={clsx('flex justify-center items-center m-auto w-full', 'md:w-[600px]', 'lg:w-[800px]')}>
        <DrawerHeader>
          <DrawerTitle>Modify category</DrawerTitle>
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
            <span className="text-red-500 text-sm h-3">{errors.name?.message || ' '}</span>
          </div>

          {/** 색상 선택 링크*/}
          <div className="grid gap-2 ">
            <Label htmlFor="title">카테고리 색상</Label>
            <ColorPicker color={color} setColor={selectColor} />
            <span className="text-red-500 text-sm h-3">{errors.color?.message || ' '}</span>
          </div>

          <Button type="submit" disabled={isLoading}>
            카테고리 수정
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
