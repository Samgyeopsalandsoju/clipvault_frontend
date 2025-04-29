'use client';

import { useUserClips } from '../hook';

// 유저 클립 리스트
const UserClips = () => {
  const { data, isLoading } = useUserClips();

  return (
    <section className="px-[16px] md:px-[16px] lg:px-[60px] py-[50px]">
      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-5">퍼블릭 링크 리스트</h1>
      {isLoading ? <div>Loading...</div> : <ul></ul>}
    </section>
  );
};

export { UserClips };
