'use client';

import { usePresignedUrl, useShareLink } from '@/hooks';
import { createToast } from '@/libs';
import { IClipResponse } from '@/types';
import { CircularProgress, Dialog } from '@mui/material';
import classNames from 'classnames';
import { Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { ExpiryDateSelector } from '@/components';

interface ShareLinkModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  list: IClipResponse[];
}

export const ShareLinkModal = ({ isOpen, setIsOpen, list }: ShareLinkModalProps) => {
  const { prepareFileData, upload } = useShareLink();
  const { generatePutUrl } = usePresignedUrl();
  const [shareLink, setShareLink] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = createToast();
  const router = useRouter();

  const prepareAndUpload = async (): Promise<void> => {
    if (isLoading) return;

    const { blob, fileName, id } = prepareFileData({ list });
    const url = await generatePutUrl({ fileName, fileType: blob.type });
    const shareUrl = await upload({ id, file: blob, fileType: blob.type, url });
    setShareLink(shareUrl);
  };

  const handleShareLink = async (): Promise<void> => {
    if (shareLink || isLoading) return;
    try {
      setIsLoading(true);
      await prepareAndUpload();
    } catch (error) {
      console.error('Error sharing link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy text:', error);
      toast.error('Unable to copy link');
    }
  };

  const handleSelect = (days: string): void => {
    console.log('days', days);
  };

  const redirectToShareLinkPage = (): void => {
    router.push('/shareLink');
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        setShareLink('');
        setIsLoading(false);
      }}
      fullWidth
    >
      <div className="border-b-[1px] dark:border-border-divider-dark p-4 flex- flex-col gap-[1px]">
        <h1 className="text-[1.3rem] tracking-[-1px] font-bold select-none dark:text-text-primary-dark">
          Create share link
        </h1>
      </div>

      <div className="flex flex-col py-[26px] px-4 gap-5">
        <p className="select-none dark:text-text-primary-dark">
          The shared link will expire in 30 days. <br />
          Once expired, it will no longer be accessible.
        </p>

        {!!shareLink && (
          <div className="flex gap-[10px]">
            <input
              className={classNames(
                'flex flex-1 h-[40px] rounded-[8px] p-[10px] dark:text-text-primary-dark',
                'dark:bg-background-secondary-dark border-solid border-[1px] dark:border-border-focus-dark'
              )}
              value={shareLink}
              readOnly
            />
            <button
              className={classNames(
                'border-solid border-[1px] dark:border-border-focus-dark dark:text-text-primary-dark',
                'dark:bg-background-secondary-dark rounded-[8px] p-[10px] hover:dark:bg-background-primary-dark',
                'active:scale-[0.97]'
              )}
              onClick={handleCopy}
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
                'dark:bg-background-secondary-dark border-solid border-[1px] dark:border-border-focus-dark'
              )}
              placeholder="Title"
            />
            <ExpiryDateSelector onSelect={handleSelect} />
          </div>
        )}
        <div className="flex gap-[15px]">
          <button
            className={classNames(
              'dark:text-text-primary-dark border-solid border-[1px] p-[0.45rem] rounded-[8px]',
              'text-[0.9rem] h-[40px] w-[64%] hover:dark:bg-background-secondary-dark active:scale-[0.97]',
              {
                visible: !shareLink,
                invisible: !!shareLink,
              }
            )}
            onClick={handleShareLink}
            disabled={isLoading || !!shareLink}
          >
            {!isLoading ? 'Create' : <CircularProgress size={20} color="inherit" />}
          </button>

          <MypageButton onClick={redirectToShareLinkPage}>My Share Link</MypageButton>
        </div>
      </div>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    max-width: 400px;
    margin: 16px;
    border-radius: 16px;
    position: relative;
    background-color: ${(props) => props.theme.background.primary};
    border: 1px solid ${(props) => props.theme.border.divider};
  }
`;

const CreateButton = styled.button<{ $display: boolean }>`
  visibility: ${(props) => (props.$display ? 'hidden' : '')};
  color: ${(props) => props.theme.text.primary};
  border: 1px solid ${(props) => props.theme.border.divider};
  padding: 0.45rem;
  border-radius: 8px;
  font-size: 0.9rem;
  height: 40px;
  width: 64%;
  &:hover {
    background-color: ${(props) => props.theme.background.secondary};
  }

  &:active {
    scale: 0.97;
  }
`;

const MypageButton = styled.button`
  color: ${(props) => props.theme.text.placeholder};
  border: 1px solid ${(props) => props.theme.border.focus};
  padding: 0.7rem;
  border-radius: 8px;
  height: 40px;
  font-size: 0.9rem;
  &:hover {
    color: ${(props) => props.theme.text.primary};
    border: 1px solid ${(props) => props.theme.border.divider};
  }

  &:active {
    scale: 0.97;
  }
`;
