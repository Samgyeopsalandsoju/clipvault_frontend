'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

export const CreateClipButton = () => {
  const router = useRouter();

  const handleNewClick = () => {
    router.push('/clips/new');
  };

  return <CreateButton onClick={handleNewClick}>Create Clip!</CreateButton>;
};

const CreateButton = styled(Button)`
  border-top: 1px solid ${(props) => props.theme.border.primary};
  border-radius: 0 0 18px 18px;
  background: ${(props) => props.theme.background.primary};
  color: ${(props) => props.theme.text.primary};
  position: absolute;
  text-transform: capitalize;
  bottom: 0;
  height: 60px;
  left: 0;
  right: 0;
  max-width: 478px;
  margin: 0 auto;
  font-weight: 600;
  font-size: 15px;
  z-index: 99;
`;
