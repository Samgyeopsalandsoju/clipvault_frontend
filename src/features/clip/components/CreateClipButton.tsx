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
  position: absolute;
  bottom: 50px;
  padding-bottom: 16px;
  width: 100%;
  background: white;
`;

const CreateButton = styled(Button)`
  position: sticky;
  text-transform: capitalize;
  display: block;
  width: 100%;
  padding: 0;
  height: 50px;
  font-size: 18px;
`;
