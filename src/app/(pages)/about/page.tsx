function AboutPage() {
  return (
    <main className="p-1 pt-4 md:p-10 relative">
      <section className="flex flex-col gap-5">
        <h1 className="tracking-tighter text-2xl font-bold">Clipvault</h1>
        <div className="border-b border-1 border-black " />
        <h4>ClipVault는 웹에서 발견한 유용한 링크들을 저장하고 관리하는 플랫폼입니다.</h4>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">feature.</h3>
          <p>
            <span className="font-semibold"> · 간편한 저장 - </span>원하는 모든 링크를 빠르게 저장하세요.
          </p>
          <p>
            <span className="font-semibold">· 카테고리화 -</span>링크를 주제별로 정리하여 필요할 때 쉽게 찾으세요.
          </p>
          <p>
            <span className="font-semibold"> · 공유 기능 - </span>컬렉션을 다른 사람들과 간편하게 공유하세요.
          </p>
        </div>
        <div className="border-b border-1 border-black " />
        <p>당신만의 북마크 컬렉션을 시작하세요.</p>
      </section>
    </main>
  );
}

export default AboutPage;
