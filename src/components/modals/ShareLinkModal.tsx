'use client';

import { usePresignedUrl, useShareFile, useShareLink } from '@/hooks';
import { IClipResponse, IShareLinkRequest } from '@/types';
import classNames from 'classnames';
import { Copy, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { handleCopy } from '@/utils';
import { ExpiryDateSelector } from '../feature/clip/ExpiryDateSelector';

interface ShareLinkModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  list: IClipResponse[];
}

export const ShareLinkModal = ({ setIsOpen, list }: ShareLinkModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm<IShareLinkRequest>();
  const { prepareFileData, upload } = useShareFile();
  const { postShareLink } = useShareLink();
  const { generatePutUrl } = usePresignedUrl();
  const [shareLink, setShareLink] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showingDue, setShowingDue] = useState<string>('7');
  const router = useRouter();

  const handleSelect = ({ days, showingDue }: { days: string; showingDue: string }): void => {
    setShowingDue(showingDue);
    setValue('due', days);
  };

  const redirectToShareLinkPage = (): void => {
    router.push('/shareLink');
  };

  const onSubmit = async (data: IShareLinkRequest) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const { blob, fileName, url } = prepareFileData({ list, title: getValues('title'), due: getValues('due') });
      const { body, status } = await postShareLink({ ...data, link: url });

      if (body === '4001') {
        const postToS3Url = await generatePutUrl({ fileName, fileType: blob.type });
        const result = await upload({ file: blob, fileType: blob.type, url: postToS3Url });
        setShareLink(url);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error sharing link:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={classNames('fixed inset-0 bg-black bg-opacity-50', 'flex items-center justify-center z-[99]')}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
          setTimeout(() => {
            setIsLoading(false);
            reset();
            setShareLink('');
            setShowingDue('7');
          }, 100);
        }
      }}
    >
      <div className="dark:bg-background-primary-dark rounded-[16px] m-4 border-[1px] dark:border-border-divider-dark w-[400px]">
        <div className="border-b-[1px] dark:border-border-secondary-dark p-4 flex- flex-col gap-[1px]">
          <h1 className="text-[1.3rem] tracking-[-1px] font-bold select-none dark:text-text-primary-dark">
            Create share link
          </h1>
        </div>

        <form className="flex flex-col py-[26px] px-4 gap-5" onSubmit={handleSubmit(onSubmit)}>
          <p className="select-none dark:text-text-primary-dark">
            {`The shared link will expire in ${showingDue} day${showingDue === '1' ? '' : 's'}. `}
            <br />
            Once expired, it will no longer be accessible.
          </p>

          {!!shareLink && (
            <div className="flex w-full gap-[10px]">
              <input
                className={classNames(
                  'flex w-full h-[40px] rounded-[8px] p-[10px] dark:text-text-primary-dark',
                  'dark:bg-background-secondary-dark border-solid border-[1px] dark:border-border-focus-dark'
                )}
                value={shareLink}
                readOnly
              />
              <button
                type="button"
                className={classNames(
                  'border-solid border-[1px] dark:border-border-focus-dark dark:text-text-primary-dark',
                  'dark:bg-background-secondary-dark rounded-[8px] p-[10px] hover:dark:bg-background-primary-dark',
                  'active:scale-[0.97]'
                )}
                onClick={() => handleCopy(shareLink)}
              >
                <Copy size={16} />
              </button>
            </div>
          )}
          {!shareLink && (
            <div className="flex flex-col gap-[0.7rem]">
              <input
                className={classNames(
                  'flex flex-1 h-[40px] rounded-[8px] p-[10px] dark:text-text-primary-dark',
                  'dark:bg-background-secondary-dark border-solid border-[1px]',
                  {
                    'dark:border-border-focus-dark': !errors.title,
                    'border-[#f44336]': !!errors.title,
                  }
                )}
                {...register('title', {
                  required: 'title is required',
                  maxLength: { value: 10, message: 'up to 10 letters' },
                  onChange: (e) => {
                    const value = e.target.value;
                    if (value.length > 10) {
                      e.target.value = value.slice(0, 10);
                    }
                  },
                })}
                onBlur={() => trigger('title')}
                placeholder="Title"
              />
              <ExpiryDateSelector onSelect={handleSelect} />
            </div>
          )}
          <div className="flex gap-[15px]">
            <button
              className={classNames(
                'dark:text-text-primary-dark border-solid border-[1px] dark:border-border-focus-dark p-[0.45rem] rounded-[8px]',
                'text-[0.9rem] h-[40px] w-[60%] hover:dark:bg-background-secondary-dark active:scale-[0.97]',
                {
                  visible: !shareLink,
                  invisible: !!shareLink,
                }
              )}
              type="submit"
              disabled={isLoading || !!shareLink}
            >
              {!isLoading ? 'Create' : <LoaderCircle className="dark:text-text-primary-dark animate-spin m-auto" />}
            </button>

            <button
              className={classNames(
                'dark:text-text-placeholder-dark border-solid border-[1px] dark:border-border-secondary-dark',
                'p-[0.7rem] rounded-[8px] h-[40px] text-[0.9rem] flex flex-1 hover:text-text-primary-dark',
                'hover:dark:border-border-divider-dark active:scale-[0.97] justify-center items-center'
              )}
              type="button"
              onClick={redirectToShareLinkPage}
            >
              My Share Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
