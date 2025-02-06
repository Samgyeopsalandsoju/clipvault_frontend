'use client';

import { Slide, Stack } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { ClipPageOpenAtom } from '@/atoms/clip.atom';
import ClipPage from './page';
import styled from 'styled-components';
import { useClipPageTransition } from '@/hooks/clip/useClipPageTransition';

export default function ClipLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isOpen = useAtomValue(ClipPageOpenAtom);
  const { handleClose } = useClipPageTransition();
  useEffect(() => {
    setMounted(true);
  }, []);

  const modalPaths = ['/clips/new', '/clips/edit', '/clips/detail/'];
  const shouldShowModal = modalPaths.some((path) => pathname.startsWith(path));
  return (
    <LayoutContainer>
      <BaseLayer>
        <ClipPage />
      </BaseLayer>

      {shouldShowModal && (
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
  flex: 1;
  height: 100%;
  overflow-x: hidden;
`;

const BaseLayer = styled(Stack)`
  position: relative;
  width: 100%;
  flex: 1;
  height: 100%;
`;

const OverlayContainer = styled(Stack)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 99999; // 레이어 순서 보장
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
  max-width: 480px;
  margin: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60vh;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  pointer-events: auto;
  background-color: ${(props) => props.theme.background.primary};
  border: 1px solid ${(props) => props.theme.border.primary};

  z-index: 1; // OverlayContainer 내부에서의 순서

  /* 다른 요소들 위에 보이도록 하는 추가 속성들 */
  isolation: isolate; // 새로운 쌓임 맥락 생성
  transform: translateZ(0); // 하드웨어 가속 활성화
  @media screen and (max-width: 1024px) {
    height: 65vh;
  }
`;
