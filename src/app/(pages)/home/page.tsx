import { NewestList } from '@/features/newest-slider';
import { PublicList } from '@/features/public-link';
import clsx from 'clsx';
const HomePage = () => {
  return (
    <main className={clsx('border-l border-r border-dotted ', 'lg:mx-[80px]')}>
      <section className="py-10 p-[50px] pt-[100px]">
        <div className="flex justify-center items-center gap-2 mb-3">
          <h1 className="text-3xl font-semibold">Discover & Share Valuable links</h1>
        </div>
        <div className="text-center px-4 py-0 text-xl text-text-placeholder">
          재미있고 신기한 링크들을 찾아보세요!
        </div>
      </section>
      <section className="flex flex-col">
        {/** 최근 등록 링크 목록 */}
        <NewestList />
        <hr className="m-[30px] border-dotted" />
        {/** 랜덤 링크 목록 */}
        <PublicList />
      </section>
    </main>
  );
};

export default HomePage;
