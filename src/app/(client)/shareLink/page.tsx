'use client';

import { ConfirmModal } from '@/components/modals';
import { SkeletonUI } from '@/components/skeleton/SkeletonUI';
import { CountDownTimer } from '@/components/ui';
import { useShareLink } from '@/hooks';
import { IShareLinkResponse } from '@/types';
import { handleCopy, openInNewTab } from '@/utils';
import classNames from 'classnames';
import { Trash2, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const shareLink = () => {
  const {
    shareLinks: { data, isLoading },
    deleteShareLink,
  } = useShareLink();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IShareLinkResponse | null>(null);

  const handleDeleteShareLink = async ({ id, link }: IShareLinkResponse) => {
    await deleteShareLink({ id, link });
    setIsOpen(false);
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
          <div className="flex flex-col gap-4">
            {data.map((item, index) => {
              return (
                <div key={index}>
                  <div className="flex gap-[10px]">
                    <button
                      className="border-solid border-[1px] border-[#f44336] rounded-[8px] p-[10px] text-[#f44336] dark:bg-background-secondary-dark active:scale-[0.97]"
                      onClick={() => {
                        setIsOpen(true);
                        setSelectedItem(item);
                      }}
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
          </div>
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
      {isOpen && (
        <ConfirmModal
          setIsOpen={setIsOpen}
          text={'Are you sure you want to delete?'}
          onAgree={() => {
            if (selectedItem) {
              handleDeleteShareLink(selectedItem);
            }
            setSelectedItem(null);
          }}
          onCancel={() => {
            setIsOpen(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
};

export default shareLink;
