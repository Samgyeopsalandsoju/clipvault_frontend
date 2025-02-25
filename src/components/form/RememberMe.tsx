'use client';

import { useRememberMe } from '@/hooks';

export const RememberMe = () => {
  const { rememberMe, setRememberMe } = useRememberMe();

  return (
    <div className="flex justify-between mt-2">
      <label className="flex items-center text-text-placeholder leading-[150%] tracking-[0.15px] cursor-pointer">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="mr-2 h-4 w-4 dark:text-text-placeholder-dark"
        />
        <span className="text-xs select-none dark:text-text-placeholder-dark text-[12px]">Remember me</span>
      </label>
    </div>
  );
};
