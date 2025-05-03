import { CategoryList } from '@/features/category';
import { ModifyCategory } from '@/features/category/modify-category/ui/ModifyCategory';
import { VisibleCategory } from '@/features/category/visible-selector/ui/VisibleCategory';
import { ModifyClip } from '@/features/clips/modify-clip/ui/ModifyClip';
import { UserClips } from '@/features/clips/user-clips';
import { ClipPanel } from '@/widgets/clip/clip-panel/ui/ClipPanel';
import { MobileCreateButton } from '@/widgets/clip/create-button/ui/MobileCreateButton';

function ClipsPage() {
  return (
    <main className="border-l border-r border-dotted lg:mx-[200px] p-1 pt-4 md:p-10 relative">
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
      <ModifyClip />
      <ModifyCategory />
    </main>
  );
}

export default ClipsPage;
