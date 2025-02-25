export const SkeletonUI = {
  // tag
  Tag: () => {
    return (
      <div className="flex space-x-2 p-4">
        <div className="h-7 w-20 bg-gray-600/50 rounded-[8px] animate-pulse"></div>
        <div className="h-7 w-20 bg-gray-600/50 rounded-[8px] animate-pulse"></div>
        <div className="h-7 w-20 bg-gray-600/50 rounded-[8px] animate-pulse"></div>
        <div className="h-7 w-20 bg-gray-600/50 rounded-[8px] animate-pulse"></div>
        <div className="h-7 w-20 bg-gray-600/50 rounded-[8px] animate-pulse"></div>
      </div>
    );
  },

  ShareLink: () => {
    return (
      <div className="flex flex-col items-center  p-4 justify-center gap-[1rem]">
        <div className="flex w-full gap-[1rem]">
          <div className="border-solid border-[1px] border-gray-600/50 rounded-[0.5rem] w-[40px] h-[40px] rounded-[8px] animate-pulse" />
          <div className="h-[40px] flex flex-1 border-solid border-[1px] border-gray-600/50 rounded animate-pulse t"></div>
          <div className="border-solid border-[1px] border-gray-600/50 rounded-[0.5rem] w-[40px] h-[40px] rounded-[8px] animate-pulse" />
          <div className="border-solid border-[1px] border-gray-600/50 rounded-[0.5rem] w-[40px] h-[40px] rounded-[8px] animate-pulse" />
        </div>
        <div className="flex w-full gap-[1rem]">
          <div className="border-solid border-[1px] border-gray-600/50 rounded-[0.5rem] w-[40px] h-[40px] rounded-[8px] p-[10px] animate-pulse" />
          <div className="h-[40px]flex flex-1 border-solid border-[1px] border-gray-600/50 rounded animate-pulse t"></div>
          <div className="border-solid border-[1px] border-gray-600/50 rounded-[0.5rem] w-[40px] h-[40px] rounded-[8px] p-[10px] animate-pulse" />
          <div className="border-solid border-[1px] border-gray-600/50 rounded-[0.5rem] w-[40px] h-[40px] rounded-[8px] p-[10px] animate-pulse" />
        </div>
        <div className="flex w-full gap-[1rem]">
          <div className="border-solid border-[1px] border-gray-600/50 rounded-[0.5rem] w-[40px] h-[40px] rounded-[8px] p-[10px] animate-pulse" />
          <div className="h-[40px] flex flex-1 border-solid border-[1px] border-gray-600/50 rounded animate-pulse t"></div>
          <div className="border-solid border-[1px] border-gray-600/50 rounded-[0.5rem] w-[40px] h-[40px] rounded-[8px] p-[10px] animate-pulse" />
          <div className="border-solid border-[1px] border-gray-600/50 rounded-[0.5rem] w-[40px] h-[40px] rounded-[8px] p-[10px] animate-pulse" />
        </div>
        <div className="flex w-full gap-[1rem]">
          <div className="border-solid border-[1px] border-gray-600/50 rounded-[0.5rem] w-[40px] h-[40px] rounded-[8px] p-[10px] animate-pulse" />
          <div className="h-[40px] flex flex-1 border-solid border-[1px] border-gray-600/50 rounded animate-pulse t"></div>
          <div className="border-solid border-[1px] border-gray-600/50 rounded-[0.5rem] w-[40px] h-[40px] rounded-[8px] p-[10px] animate-pulse" />
          <div className="border-solid border-[1px] border-gray-600/50 rounded-[0.5rem] w-[40px] h-[40px] rounded-[8px] p-[10px] animate-pulse" />
        </div>
      </div>
    );
  },

  Edit: () => {
    return (
      <div className="flex flex-col items-center gap-[1rem]">
        <div className="h-[45px] w-full  bg-gray-600/50 rounded-[0.5rem] animate-pulse t"></div>
        <div className="h-[45px] w-full bg-gray-600/50 rounded-[0.5rem] animate-pulse t"></div>
        <div className="h-[45px] w-full bg-gray-600/50 rounded-[0.5rem] animate-pulse t"></div>
        <div className="h-[100px] w-full bg-gray-600/50 rounded-[0.5rem] animate-pulse t"></div>
      </div>
    );
  },

  // clip
  Clip: () => {
    return (
      <div className="flex flex-col gap-2 h-[90px] border-solid border-[1px] border-gray-600/50 w-full rounded-xl p-[1rem]">
        <div className="flex items-start justify-between gap-[2px]">
          <div className="flex  flex-1 min-w-0 gap-2 items-center">
            <div className="h-7 w-20 bg-gray-600/50 rounded animate-pulse"></div>
            <div className="h-5 w-[100px] bg-gray-600/50 rounded animate-pulse t"></div>
          </div>
        </div>
        <div className="h-6 w-[300px] bg-gray-600/50 rounded animate-pulse t"></div>
      </div>
    );
  },

  ClipList: ({ numCards }: { numCards: number }) => {
    return (
      <div className="flex flex-col p-4 gap-3">
        {Array(numCards)
          .fill(null)
          .map((_, index) => (
            <SkeletonUI.Clip key={`skeleton-${index}`} />
          ))}
      </div>
    );
  },
};
