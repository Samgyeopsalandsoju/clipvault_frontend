'use client';

import { Stack, Typography } from '@mui/material';
import styled from 'styled-components';

const Page = () => {
  return (
    <Container>
      <Wrapper>
        <Title>My Page</Title>
        <ChangePasswordSection></ChangePasswordSection>
      </Wrapper>
    </Container>
  );
};

export default Page;

const Container = styled(Stack)`
  padding: 1rem;
`;
const Wrapper = styled(Stack)`
  gap: 1rem;
`;

const Title = styled(Typography)`
  color: ${(props) => props.theme.text.primary};
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
`;

const ChangePasswordSection = styled(Stack)``;
