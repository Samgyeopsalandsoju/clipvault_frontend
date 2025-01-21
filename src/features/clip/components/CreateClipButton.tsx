'use client';

import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const CreateClipButton = () => {
  const router = useRouter();
  const handleNewClick = () => {
    router.push('/clip/new');
  };
  return (
    <ButtonContainer>
      <CreateButton onClick={handleNewClick}>Create Clip!</CreateButton>
    </ButtonContainer>
  );
};

export default CreateClipButton;

const ButtonContainer = styled(Stack)`
  border-radius: 18px;
  border: 1px solid ${(props) => props.theme.border.divider};
  position: absolute;
  bottom: 50px;
  padding-bottom: 16px;
  width: 100%;
  background: ${(props) => props.theme.background.primary};
`;

const CreateButton = styled(Button)`
  color: ${(props) => props.theme.text.primary};
  position: sticky;
  text-transform: capitalize;
  display: block;
  width: 100%;
  padding: 0;
  height: 50px;
  font-size: 18px;
`;
