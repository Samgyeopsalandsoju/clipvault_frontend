'use client';

import { Card } from '@/shared/ui/shadcn';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <main className="p-1 pt-4 md:p-10 relative">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
        {/** 마이 페이지 메뉴 */}
        <Card className="h-fit">
          <nav className={clsx('flex md:flex-col gap-2 p-2 px-3', 'justify-center')}>
            <div
              className="p-4 text-sm md:text-base cursor-pointer md:border-b"
              style={{
                fontWeight: pathname.includes('/forks') ? '500' : '300',
              }}
              onClick={() => router.push('/mypage/forks')}
            >
              Fork Clip
            </div>
            <div
              className="p-4 text-sm md:text-base cursor-pointer"
              style={{
                fontWeight: pathname.includes('/share') ? '500' : '300',
              }}
              onClick={() => router.push('/mypage/share')}
            >
              Share link
            </div>
          </nav>
        </Card>
        <div className="lg:col-span-2">{children}</div>
      </section>
    </main>
  );
}
