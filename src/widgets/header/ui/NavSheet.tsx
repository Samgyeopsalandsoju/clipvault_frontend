'use client';

import { useAuthModalStore } from '@/features/auth/login/model/store';
import { LogoutButton } from '@/features/auth/logout/ui/LogoutButton';
import { SheetContent, SheetHeader, SheetTitle, SheetClose, Button } from '@/shared/ui/shadcn';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const NavSheet = () => {
  const handleLoginModalOpen = useAuthModalStore((state) => state.onLoginModalOpen);
  const { data } = useSession();
  const router = useRouter();

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-2xl">clipVault</SheetTitle>
      </SheetHeader>
      <div className="grid gap-4 py-4 pt-20">
        {data ? (
          <ul className="flex flex-col gap-10">
            <SheetClose className="border-b text-start">
              <Button type="submit" variant={'link'} onClick={() => router.push('/home')}>
                home
              </Button>
            </SheetClose>
            <SheetClose className="border-b text-start">
              <Button type="submit" variant={'link'} onClick={() => router.push('/clips')}>
                clips
              </Button>
            </SheetClose>
            <SheetClose className="border-b text-start">
              <Button type="submit" variant={'link'} onClick={() => router.push('/mypage/forks')}>
                my page
              </Button>
            </SheetClose>
            <SheetClose className="border-b text-start">
              <Button type="submit" variant={'link'} onClick={() => router.push('/about')}>
                about
              </Button>
            </SheetClose>
            <SheetClose className="text-start">
              <LogoutButton color="red" />
            </SheetClose>
          </ul>
        ) : (
          <ul className="flex flex-col gap-10">
            <SheetClose className="border-b text-start">
              <Button type="submit" variant={'link'} onClick={() => handleLoginModalOpen()}>
                login
              </Button>
            </SheetClose>
            <SheetClose className="border-b text-start">
              <Button type="submit" variant={'link'} onClick={() => router.push('/register')}>
                register
              </Button>
            </SheetClose>
          </ul>
        )}
      </div>
    </SheetContent>
  );
};
