'use client';

import { VisibilitySelector } from '@/entities/clip';
import { Button } from '@/shared/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/shared/ui/drawer';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import clsx from 'clsx';
import { useCreateForm } from '../hook/useCreateForm';
import { createClipValidation } from '../model/validation';
import { useState } from 'react';
import { VisibilityType } from '@/shared/model/clips.type';
import { CategorySelector } from '@/features/category/ui/CategorySelector';
import { useCreateClip } from '../hook/useCreateClip';
import { ICreateForm } from '../model/type';

// 클립 생성 모달
export const CreateDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { register, handleSubmit, errors, reset, setValue } = useCreateForm();
  const { createClip } = useCreateClip();
  const [visibility, setVisibility] = useState<string>('');
  const [category, setCategory] = useState<string | null>(null);
  // 공개 범위 변경 핸들러
  const handleVisibilityChange = (value: string) => {
    setVisibility(value as VisibilityType);
    setValue('visible', value);
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (id: string) => {
    setCategory(id);
    setValue('category', { id, name: '', color: '' });
  };

  const onSubmit = async (data: ICreateForm) => {
    const res = await createClip(data);

    if (res === '3001') {
      onClose();
    }
  };

  // 닫기 핸들러
  const handleClose = () => {
    onClose();
    reset();
  };

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
          <DrawerTitle>Create Clip</DrawerTitle>
        </DrawerHeader>
        <form
          className="flex flex-col gap-4 w-full px-4 lg:w-[40vw] py-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/** 공개 범위 설정 */}
          <VisibilitySelector value={visibility} onChange={handleVisibilityChange} />

          {/** 카테고리 설정 */}
          <CategorySelector categoryId={category} onChange={handleCategoryChange} />

          {/** 클립 제목*/}
          <div className="grid gap-2 ">
            <Label htmlFor="title">클립 제목</Label>
            <Input
              id="title"
              type="text"
              placeholder="Clip 이름"
              {...register('title', { required: createClipValidation.title.required })}
            />
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
          </div>

          <Button type="submit">클립 생성</Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
