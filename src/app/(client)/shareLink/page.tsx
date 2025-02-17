'use client';

import { CountDownTimer } from '@/components';
import { SkeletonUI } from '@/components/skeleton/SkeletonUI';
import { useShareLink } from '@/hooks';
import { IShareLinkResponse } from '@/types';
import { handleCopy, openInNewTab } from '@/utils';
import classNames from 'classnames';
import { Trash2, Copy, ExternalLink } from 'lucide-react';

const shareLink = () => {
  const {
    shareLinks: { data, isLoading },
    deleteShareLink,
  } = useShareLink();

  const handleDeleteShareLink = async ({ id, link }: IShareLinkResponse) => {
    deleteShareLink({ id, link });
  };

  if (isLoading)
    return (
      <>
        <SkeletonUI.ShareLink />
      </>
    );
  return (
    <div className="flex flex-1 flex-col p-4">
      {data.length > 0 ? (
        <>
          <div className="pb-4 pl-2">
            <p className="text-[0.9rem] select-none dark:text-text-placeholder-dark">
              Your clips, all neatly gathered here... take a look. ( {data.length}/10 )
            </p>
          </div>
          {data.map((item, index) => {
            return (
              <div className="gap-4" key={index}>
                <div className="flex gap-[10px]">
                  <button
                    className="border-solid border-[1px] border-[#f44336] rounded-[8px] p-[10px] text-[#f44336] dark:bg-background-secondary-dark active:scale-[0.97]"
                    onClick={() => handleDeleteShareLink(item)}
                  >
                    <Trash2 size={16} />
                  </button>
                  <div
                    className={classNames(
                      'flex flex-1 h-[40px] border-[1px]  rounded-[8px] p-[10px] border-solid dark:border-border-focus-dark',
                      'dark:text-text-placeholder-dark dark:bg-background-secondary-dark justify-between px-4'
                    )}
                  >
                    {item.title}
                    <CountDownTimer targetDate={item.due} />
                  </div>
                  <button
                    className="border-solid border-[1px]  dark:border-border-focus-dark rounded-[8px] p-[10px] dark:text-text-primary-dark dark:bg-background-secondary-dark active:scale-[0.97]"
                    onClick={() => handleCopy(item.link)}
                  >
                    <Copy size={16} />
                  </button>
                  <button className="border-solid border-[1px]  dark:border-border-focus-dark rounded-[8px] p-[10px] dark:text-text-primary-dark dark:bg-background-secondary-dark active:scale-[0.97]">
                    <ExternalLink size={16} onClick={() => openInNewTab(item.link)} />
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div className="h-full pt-[200px]">
            <p className="dark:text-text-placeholder-dark text-center">
              No shared links yet. <br />
              Head over to Home to discover and fork interesting clips!
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default shareLink;
