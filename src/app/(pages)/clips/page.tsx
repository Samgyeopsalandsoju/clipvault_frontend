import { LoginForm } from '@/features/auth/ui/LoginForm';
import { UserClips } from '@/features/clips/user-clips';
import clsx from 'clsx';

function ClipsPage() {
  return (
    <main className={clsx('border-l border-r border-dotted ', 'lg:mx-[80px]')}>
      <section className="py-10 p-[50px] pt-[100px]">
        <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold">내가 등록한 링크</h1>
      </section>
      <section className="flex flex-col">
        <section className="flex flex-col">
          {/** 내 링크 목록 */}
          {/* <UserClips /> */}
          <LoginForm />
        </section>
      </section>
    </main>
  );
}

export default ClipsPage;
