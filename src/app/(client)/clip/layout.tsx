'use client';

import { Slide, Stack } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { NewClipPageOpenAtom } from '@/features/clip/atom';
import ClipPage from './page';
import styled from 'styled-components';
import { useClipPageTransition } from '@/features/clip/hooks/useClipPageTransition';
import CreateClipButton from '@/features/clip/components/CreateClipButton';

export default function ClipLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isOpen = useAtomValue(NewClipPageOpenAtom);
  const { handleClose } = useClipPageTransition();
  useEffect(() => {
    setMounted(true);
  }, []);

  const isNewPage = pathname === '/clip/new';

  return (
    <LayoutContainer>
      <BaseLayer>
        <ClipPage />
        <CreateClipButton />
      </BaseLayer>

      {isNewPage && (
        <OverlayContainer>
          <Backdrop $isOpen={isOpen} onClick={handleClose} />
          <Slide direction="up" in={isOpen && mounted}>
            <ModalLayer>{children}</ModalLayer>
          </Slide>
        </OverlayContainer>
      )}
    </LayoutContainer>
  );
}

const LayoutContainer = styled(Stack)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BaseLayer = styled(Stack)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const OverlayContainer = styled(Stack)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const Backdrop = styled(Stack)<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  pointer-events: auto;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transition: opacity 300ms ease;
`;

const ModalLayer = styled(Stack)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50vh;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
`;
