import { CategoryList } from '@/features/category/ui/CategoryList';
import VisibleCategory from '@/features/category/ui/VisibleCategory';
import { UserClips } from '@/features/clips/user-clips';
import { ClipPanel } from '@/widgets/clip-management-panel/ui/ClipPanel';

function ClipsPage() {
  return (
    <main className="border-l border-r border-dotted lg:mx-[200px] p-1 pt-4 md:p-10">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/** 공개 비공개 카테고리 선택 */}
        <div className="flex flex-col gap-4">
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
    </main>
  );
}

export default ClipsPage;
