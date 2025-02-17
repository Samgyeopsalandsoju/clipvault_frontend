import { CountDownTimer } from '@/components/ui';

export const ShareInfoSection = ({ title, due }: { title: string; due: string }) => {
  return (
    <div className="p-[0.5rem] flex items-center justify-between w-full">
      <div className="w-24"></div>
      <h1 className="text-[1.5rem] dark:text-text-primary-dark flex ">{title}</h1>
      <div className="dark:text-text-placeholder-dark w-24 text-right text-[0.9rem]">
        <CountDownTimer targetDate={due} />
      </div>
    </div>
  );
};
