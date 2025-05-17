import { CreateCategory } from '@/features/category';
import { CreateClip } from '@/features/clip/ui/CreateClip';
import { Button } from '@/shared/ui/shadcn';
import { useState } from 'react';

export const CreateButton = () => {
  // clip 생성 모달 오픈
  const [isOpenClip, setIsOpenClip] = useState<boolean>(false);
  // category 생성 모달 오픈
  const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);

  const [isDropDown, setIsDropDown] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setIsDropDown(true)}>Create</Button>
      {isDropDown && (
        <>
          {/* 오버레이 배경 */}
          <div className="fixed inset-0 z-40 w-screen h-screen" onClick={() => setIsDropDown(false)} />

          {/* 드롭다운 콘텐츠 */}
          <div className="absolute z-50 p-1 top-[98px] right-[56px] w-40 rounded-md border bg-white shadow-lg">
            <div
              className="py-1.5 px-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
              onClick={() => {
                setIsOpenCategory(true);
                setIsDropDown(false);
              }}
            >
              create category
            </div>
            <div className="border-t border-gray-200 my-1" />
            <div
              className="py-1.5 px-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm"
              onClick={() => {
                setIsOpenClip(true);
                setIsDropDown(false);
              }}
            >
              create clip
            </div>
          </div>
        </>
      )}
      <CreateClip isOpen={isOpenClip} onClose={() => setIsOpenClip(false)} />
      <CreateCategory isOpen={isOpenCategory} onClose={() => setIsOpenCategory(false)} />
    </>
  );
};
