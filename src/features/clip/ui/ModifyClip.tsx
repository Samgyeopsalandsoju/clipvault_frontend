'use client';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, Input, Label, Textarea, Button } from '@/shared/ui/shadcn';
import clsx from 'clsx';
import { VisibilitySelector } from '@/entities/clip';
import { useEffect } from 'react';
import { Trash } from 'lucide-react';
import { CategorySelector } from '@/features/category';
import { useModifyClipModalStore } from '../model/stores';
import { useModifyForm } from '../hooks/useModifyForm';
import { useModifyClip } from '../hooks/useModifyClip';
import { useDeleteClip } from '../hooks/useDeleteClip';
import { IModifyForm } from '../model/types';
// 클립 수정 모달
export const ModifyClip = () => {
  // 모달 오픈
  const isOpen = useModifyClipModalStore((state) => state.isOpen);
  const setIsOpen = useModifyClipModalStore((state) => state.setIsOpen);

  // 클립 정보 및 폼 데이터 호출
  const { register, setValue, handleSubmit, reset } = useModifyForm();
  const { clip, modify } = useModifyClip();

  // 삭제 모달 오픈
  const { deleteClip } = useDeleteClip();

  // 카테고리 변경 데이터 감지
  const handleChange = (id: string) => {
    setValue('category', { id, name: '', color: '' });
  };
  // 초기값 셋팅
  useEffect(() => {
    if (clip) {
      setValue('id', clip.id);
      setValue('title', clip.title);
      setValue('link', clip.link);
      setValue('visible', clip.visible);
      setValue('category', clip.category);
    }
  }, [clip]);

  const onSubmit = (data: IModifyForm) => {
    modify(data, {
      // 성공 후 로직
      onSuccess: () => {
        setIsOpen(false);
        reset();
      },
    });
  };

  // 클립 삭제
  const handleDelete = () => {
    if (!clip) return;
    if (window.confirm('해당 클립을 삭제하시겠습니까?')) {
      deleteClip(clip.id);
      setIsOpen(false);
      reset();
    }
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
          <DrawerTitle>Modify Clip</DrawerTitle>
          <button className="text-red-500 absolute right-8" onClick={handleDelete}>
            <Trash size={20} />
          </button>
        </DrawerHeader>
        <form className="flex flex-col gap-4 w-full px-4 lg:w-[40vw] py-4" onSubmit={handleSubmit(onSubmit)}>
          {/** 공개 범위 설정 */}
          <VisibilitySelector value={clip?.visible || ''} disabled onChange={() => {}} />

          {/** 카테고리 설정 */}
          <CategorySelector initialCategory={clip?.category || null} onChange={handleChange} />

          {/** 클립 제목*/}
          <div className="grid gap-2 ">
            <Label htmlFor="title">클립 제목</Label>
            <Input id="title" type="text" placeholder="Clip 이름" {...register('title')} />
          </div>

          {/** 클립 링크*/}
          <div className="grid gap-2">
            <Label htmlFor="link">클립 링크</Label>
            <Textarea id="link" placeholder="Clip 링크" className="resize-none" rows={3} {...register('link')} />
          </div>

          <Button type="submit">클립 수정</Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
