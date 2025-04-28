'use client';

import { usePublicLinkList } from '../hook';
import PublicLinkEntry from '@/entities/link/ui/PublicLinkEntry';

function PublicList() {
  const { data, isLoading } = usePublicLinkList();

  return (
    <section className="px-[60px] py-[50px]">
      <h1 className="text-2xl font-semibold mb-5">퍼블릭 링크 리스트</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data?.map((item) => {
            return <PublicLinkEntry key={item.id} {...item} />;
          })}
        </ul>
      )}
    </section>
  );
}

export default PublicList;
