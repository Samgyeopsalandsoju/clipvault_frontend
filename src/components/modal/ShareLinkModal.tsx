'use client';

import { useShareLink } from '@/hooks/clip/useShareLink';
import { usePresignedUrl } from '@/hooks/usePresignedUrl';
import { IClipResponse } from '@/types/clip';
import { CircularProgress, Dialog, Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { Copy, Loader2 } from 'lucide-react';
import styled from 'styled-components';
import { useToast } from '@/hooks/useToast';
import ExpiryDateSelector from '@/components/ExpiryDateSelector';
import { useRouter } from 'next/navigation';

interface ShareLinkModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  list: IClipResponse[];
}

const ShareLinkModal = ({ isOpen, setIsOpen, list }: ShareLinkModalProps) => {
  const { prepareFileData, upload } = useShareLink();
  const { generatePutUrl } = usePresignedUrl();
  const [shareLink, setShareLink] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { successToast, errorToast } = useToast();
  const router = useRouter();

  const prepareAndUpload = async () => {
    if (isLoading) return;

    const { blob, fileName, id } = prepareFileData({ list });
    const url = await generatePutUrl({ fileName, fileType: blob.type });
    const shareUrl = await upload({ id, file: blob, fileType: blob.type, url });
    setShareLink(shareUrl);
  };

  const handleShareLink = async () => {
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      successToast('Link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy text:', error);
      errorToast('Unable to copy link');
    }
  };

  const handleSelect = (days: string) => {
    console.log('days', days);
  };

  const redirectToShareLinkPage = () => {
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
      <TextSection>
        <Title>Create share link</Title>
      </TextSection>

      <Contents>
        <Explain>
          The shared link will expire in 30 days. <br />
          Once expired, it will no longer be accessible.
        </Explain>

        {!!shareLink && (
          <TextFieldSection>
            <ShareLinkInput value={shareLink} readOnly />
            <CopyButton onClick={handleCopy}>
              <Copy size={16} />
            </CopyButton>
          </TextFieldSection>
        )}
        {!shareLink && (
          <FieldWrapper>
            <ShareLinkInput placeholder="Title" />
            <ExpiryDateSelector onSelect={handleSelect} />
          </FieldWrapper>
        )}
        <ButtonGroup>
          <CreateButton onClick={handleShareLink} disabled={isLoading || !!shareLink} $display={!!shareLink}>
            {!isLoading ? 'Create' : <CircularProgress size={20} color="inherit" />}
          </CreateButton>

          <MypageButton onClick={redirectToShareLinkPage}>My Share Link</MypageButton>
        </ButtonGroup>
      </Contents>
    </StyledDialog>
  );
};

export default ShareLinkModal;

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

const FieldWrapper = styled(Stack)`
  gap: 0.7rem;
`;

const Title = styled(Typography)`
  color: ${(props) => props.theme.text.primary};
  font-size: 1.3rem;
  letter-spacing: -1px;
  font-weight: 700;
  user-select: none;
`;

const TextSection = styled(Stack)`
  border-bottom: 1px solid ${(props) => props.theme.border.divider};
  padding: 16px;
  gap: 1;
`;

const Contents = styled(Stack)`
  padding: 26px 16px;
  gap: 20px;
`;

const Explain = styled(Typography)`
  color: ${(props) => props.theme.text.primary};
  font-size: 1rem;
  user-select: none;
`;

const TextFieldSection = styled(Stack)`
  flex-direction: row;
  gap: 10px;
`;

const ShareLinkInput = styled.input`
  display: flex;
  flex: 1;
  color: ${(props) => props.theme.text.primary};
  background-color: ${(props) => props.theme.background.secondary};
  height: 40px;
  border: 1px solid ${(props) => props.theme.border.focus};
  border-radius: 8px;
  padding: 10px;
`;

const CopyButton = styled.button`
  color: ${(props) => props.theme.text.primary};
  border: 1px solid ${(props) => props.theme.border.focus};
  background-color: ${(props) => props.theme.background.secondary};
  border-radius: 8px;
  padding: 10px;
  &:hover {
    background-color: ${(props) => props.theme.background.secondary};
  }

  &:active {
    scale: 0.97;
  }
`;

const ButtonGroup = styled(Stack)`
  flex-direction: row;
  gap: 15px;
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

const StyledLoader = styled(Loader2)`
  width: 1rem;
  height: 1rem;
  animation: spin 1s infinite linear;
`;
