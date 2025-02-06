'use client';

import styled from 'styled-components';
import { VERSION } from '@/constants/common.constants';

const Footer = () => {
  return (
    <Container>
      <Version>v{VERSION}</Version>
      <Copyright>© 2025 clipVault. All rights reserved.</Copyright>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  border-top: 1px solid ${(props) => props.theme.border.primary};
  border-radius: 0 0 18px 18px;
  background: ${(props) => props.theme.background.primary};
  color: ${(props) => props.theme.text.primary};
  position: fixed;
  bottom: 0;
  height: 60px;
  left: 0;
  right: 0;
  max-width: 478px;
  margin: 0 auto;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  padding-top: 10px;
`;

const Version = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.text.tertiary};
`;

const Copyright = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.text.primary};
`;
