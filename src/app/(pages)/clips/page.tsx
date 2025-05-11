import dynamic from 'next/dynamic';
import { ClipPanel } from '@/widgets/clip/clip-panel/ui/ClipPanel';
import { MobileCreateButton } from '@/widgets/clip/create-button/ui/MobileCreateButton';
import { CategoryList, VisibleCategory } from '@/features/category';
import { UserClips } from '@/features/clip/user-clips';

// 모달 컴포넌트 레이지 로딩
const ModifyClip = dynamic(
  () => import('@/features/clip/modify-clip/ui/ModifyClip').then((mod) => ({ default: mod.ModifyClip })),
  {
    loading: () => null, // 모달이므로 로딩 UI가 필요 없음
  }
);

const ModifyCategory = dynamic(
  () =>
    import('@/features/category/modify-category/ui/ModifyCategory').then((mod) => ({ default: mod.ModifyCategory })),
  {
    loading: () => null, // 모달이므로 로딩 UI가 필요 없음
  }
);

function ClipsPage() {
  return (
    <main className="p-1 pt-4 md:p-10 relative">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
        {/** 공개 비공개 카테고리 선택 */}
        <div className="md:sticky md:top-20  self-start flex flex-col gap-4">
          <VisibleCategory />
          {/** 카테고리 section */}
          <CategoryList />
        </div>
        {/** 클립 리스트 */}
        <div className="flex flex-col gap-4 lg:col-span-2 ">
          <ClipPanel />
          <UserClips />
        </div>
      </section>
      <MobileCreateButton />
      {/** 클립 & 카테고리 수정 모달 */}
      {/** 레이지 로징 적용*/}
      <ModifyClip />
      <ModifyCategory />
    </main>
  );
}

export default ClipsPage;
