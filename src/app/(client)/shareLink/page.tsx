'use client';
import { Stack, Typography } from '@mui/material';
import { Trash2, Copy, ExternalLink } from 'lucide-react';
import styled from 'styled-components';

const shareLink = () => {
  return (
    <Container>
      <TitleSection>
        <SubTitle>Your clips, all neatly gathered here... take a look.</SubTitle>
      </TitleSection>
      <Wrapper>
        <ShareLinkSection>
          <DeleteButton>
            <Trash2 size={16} />
          </DeleteButton>
          <ShareLinkInput readOnly />
          <CopyButton>
            <Copy size={16} />
          </CopyButton>
          <BlankButton>
            <ExternalLink size={16} />
          </BlankButton>
        </ShareLinkSection>
        <ShareLinkSection>
          <DeleteButton>
            <Trash2 size={16} />
          </DeleteButton>
          <ShareLinkInput readOnly />
          <CopyButton>
            <Copy size={16} />
          </CopyButton>
          <BlankButton>
            <ExternalLink size={16} />
          </BlankButton>
        </ShareLinkSection>
        <ShareLinkSection>
          <DeleteButton>
            <Trash2 size={16} />
          </DeleteButton>
          <ShareLinkInput readOnly />
          <CopyButton>
            <Copy size={16} />
          </CopyButton>
          <BlankButton>
            <ExternalLink size={16} />
          </BlankButton>
        </ShareLinkSection>
      </Wrapper>
    </Container>
  );
};

export default shareLink;

const Container = styled(Stack)`
  flex: 1;
  padding: 1rem;
`;

const TitleSection = styled(Stack)`
  padding-bottom: 1rem;
  padding-left: 0.5rem;
`;
const SubTitle = styled(Typography)`
  color: ${(props) => props.theme.text.placeholder};
  font-size: 0.9rem;
  user-select: none;
`;
const ShareLinkSection = styled(Stack)`
  flex-direction: row;
  gap: 10px;
`;

const Wrapper = styled(Stack)`
  gap: 1rem;
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

const BlankButton = styled.button`
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
const DeleteButton = styled.button`
  color: #f44336;
  border: 1px solid #f44336;
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
