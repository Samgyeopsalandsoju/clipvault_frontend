import { CategoryList } from '@/components/feature';

export default function CategoryPage() {
  return (
    <>
      <div className="px-4">
        <div className="py-4 px-4 flex flex-col gap-1">
          <h1 className="dark:text-text-primary-dark text-xl font-bold select-none">Category management</h1>
          <p className="dark:text-text-placeholder-dark text-sm select-none">
            Organize up to 10 clips by creating and managing categories!
          </p>
        </div>
        <div>
          <CategoryList />
        </div>
      </div>
    </>
  );
}
