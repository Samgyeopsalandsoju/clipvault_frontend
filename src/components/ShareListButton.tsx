import { useShareLink } from '@/hooks/clip/useShareLink';
import { usePresignedUrl } from '@/hooks/usePresignedUrl';
import { IClipResponse } from '@/types/clip';
import { Stack } from '@mui/material';
import { Share } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';
import ShareLinkModal from './modal/ShareLinkModal';

interface ShareButtonProps {
  list: IClipResponse[];
}

export const ShareListButton = ({ list }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleShareLink = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Section onClick={handleShareLink}>
        <Share size={18} />
      </Section>
      <ShareLinkModal isOpen={isOpen} setIsOpen={setIsOpen} list={list} />
    </>
  );
};

export default ShareListButton;

const Section = styled(Stack)`
  position: absolute;
  bottom: 80px;
  left: 20px;
  color: ${(props) => props.theme.text.placeholder};
  border-radius: 20%;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${(props) => props.theme.border.secondary};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    scale: 1.1;
    color: ${(props) => props.theme.text.primary};
  }
`;
