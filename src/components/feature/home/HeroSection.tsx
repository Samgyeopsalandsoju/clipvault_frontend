export const HeroSection = () => {
  return (
    <div className="w-full py-4 px-4 pt-8 bg-primary flex flex-col item-center text-center">
      <div className="flex flex-row justify-center mb-3 items-center gap-1 max-[480px]:flex-col max-[480px]:gap-0">
        <h1 className="text-2xl font-medium  text-center dark:text-text-primary-dark select-none leading-[1.5]">
          Discover & Share
        </h1>
        <h1 className="text-2xl font-bold select-none  rounded-[5px] text-center px-[6px] py-0 dark:bg-text-primary-dark dark:text-background-primary leading-[1.5]">
          Valuable Links
        </h1>
      </div>
      <span className="text-center select-none px-4 py-0 text-sm dark:text-text-tertiary-dark">
        Explore the community's curated links
      </span>
      <div className="w-16 h-px m-auto dark:bg-text-tertiary-dark opacity-30 mt-6" />
    </div>
  );
};
