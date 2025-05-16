import Image from 'next/image';

export const Hero = () => {
  const imageURL = 'https://s3-clipvault.s3.ap-northeast-2.amazonaws.com/background.jpg';

  return (
    <section className="h-[400px] relative">
      {/** 배경 이미지 */}
      <Image src={imageURL} alt="hero" fill className="object-cover" priority />
      {/** 배경 블러 처리 */}
      <div className="absolute inset-0 bg-black/65 z-2"></div>
      {/** 텍스트 컨테이너 */}
      <div className="absolute z-10 flex flex-col gap-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
        <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold text-center text-white tracking-tighter">
          Discover & Share Valuable links
        </h1>
        <span className="text-gray-300 text-xs md:text-lg">
          재미있고 신기한 링크들을 찾아보세요!
        </span>
      </div>
    </section>
  );
};
