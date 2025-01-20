import { Box, Stack } from '@mui/material';
import styled from 'styled-components';

const ClipTabs = () => {
  return (
    <Container>
      <Tabs>Clip</Tabs>
      <Tabs>Fork</Tabs>
    </Container>
  );
};

export default ClipTabs;

const Container = styled(Stack)`
  flex-direction: row;
  width: 100%;
`;

const Tabs = styled(Box)`
  width: 50%;
`;
