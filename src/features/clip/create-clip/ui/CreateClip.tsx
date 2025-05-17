'use client';

import { VisibilitySelector } from '@/entities/clip';
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, Input, Label, Textarea } from '@/shared/ui/shadcn';
import clsx from 'clsx';
import { useCreateForm } from '../hook/useCreateForm';
import { createClipValidation } from '../model/validation';
import { useState } from 'react';
import { VisibilityType } from '@/shared/data/model/clips.type';
import { useCreateClip } from '../hook/useCreateClip';
import { IClipForm } from '../model/type';
import { CategorySelector } from '@/features/category';

// 클립 생성 모달
export const CreateClip = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { register, handleSubmit, errors, reset, setValue } = useCreateForm();
  // 클립 생성 후 성공 시 리셋 , 모달 닫기
  const { createClip } = useCreateClip();
  // 공개 범위 선택 상태
  const [visibility, setVisibility] = useState<string>('');
  // 카테고리 선택 상태
  // 공개 범위 변경 핸들러
  const handleVisibilityChange = (value: string) => {
    setVisibility(value as VisibilityType);
    setValue('visible', value);
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (id: string) => {
    setValue('category', { id, name: '', color: '' });
  };

  // 클립 생성 후 성공 시 리셋 , 모달 닫기
  const onSubmit = (data: IClipForm) => {
    createClip(data, {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  // 닫기 핸들러
  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent className={clsx('flex justify-center items-center m-auto w-full', 'md:w-[600px]', 'lg:w-[800px]')}>
        <DrawerHeader>
          <DrawerTitle>Create Clip</DrawerTitle>
        </DrawerHeader>
        <form className="flex flex-col gap-4 w-full px-4 lg:w-[40vw] py-4" onSubmit={handleSubmit(onSubmit)}>
          {/** 공개 범위 설정 */}
          <VisibilitySelector value={visibility} onChange={handleVisibilityChange} />

          {/** 카테고리 설정 */}
          <CategorySelector initialCategory={null} onChange={handleCategoryChange} />

          {/** 클립 제목*/}
          <div className="grid gap-2 ">
            <Label htmlFor="title">클립 제목</Label>
            <Input
              id="title"
              type="text"
              placeholder="Clip 이름"
              {...register('title', { required: createClipValidation.title.required })}
            />
            <span className="text-sm text-red-500 h-3">{errors?.title?.message || ' '}</span>
          </div>

          {/** 클립 링크*/}
          <div className="grid gap-2">
            <Label htmlFor="link">클립 링크</Label>
            <Textarea
              id="link"
              placeholder="Clip 링크"
              className="resize-none"
              rows={3}
              {...register('link', { required: createClipValidation.link.required })}
            />
            <span className="text-sm text-red-500 h-3">{errors?.link?.message || ' '}</span>
          </div>

          <Button type="submit">클립 생성</Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
