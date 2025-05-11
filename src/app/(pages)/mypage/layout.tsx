import { Card } from '@/shared/ui/shadcn';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-1 pt-4 md:p-10 relative">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
        <Card className="flex md:flex-col gap-2 p-2 px-3">
          <nav>
            <div className="p-4 text-sm md:text-base font-semibold cursor-pointer border-b">Fork Clip</div>
            <div className="p-4 text-sm md:text-base font-semibold cursor-pointer">Share link</div>
          </nav>
        </Card>
        {children}
      </section>
    </main>
  );
}
