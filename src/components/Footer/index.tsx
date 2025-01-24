'use client';

import styled from 'styled-components';
import { FaGithub, FaEnvelope, FaBook } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiReactquery, SiStyledcomponents } from 'react-icons/si';
import { Stack } from '@mui/material';

const Footer = () => {
  const techStack = [
    { icon: <SiNextdotjs />, name: 'Next.js 14' },
    { icon: <SiTypescript />, name: 'TypeScript' },
    { icon: <SiReactquery />, name: 'React Query' },
    { icon: <SiStyledcomponents />, name: 'Styled Components' },
  ];

  return (
    <FooterContainer>
      <Section sx={{ alignItems: 'center' }}>
        <Title>clipVault</Title>
        <Description>링크를 쉽게 저장하고 공유할 수 있는 서비스입니다.</Description>
      </Section>

      <Section>
        <SubTitle>Tech Stack</SubTitle>
        <TechGrid>
          {techStack.map((tech, index) => (
            <TechItem key={index}>
              {tech.icon}
              <span>{tech.name}</span>
            </TechItem>
          ))}
        </TechGrid>
      </Section>

      <Section>
        <SubTitle>Links & Resources</SubTitle>
        <LinkGrid>
          <Link href="https://github.com/Samgyeopsalandsoju/linkjoa_frontend" target="_blank">
            <FaGithub /> GitHub Repository
          </Link>
          <Link href="https://github.com/yourusername/project/docs" target="_blank">
            <FaBook /> Documentation
          </Link>
          <Link href="mailto:hyunbin.kim.3376@gamil.com">
            <FaEnvelope /> Contact
          </Link>
        </LinkGrid>
      </Section>

      <Divider />

      <BottomSection>
        <Version>v1.0.0</Version>
        <Copyright>© 2025 clipVault. All rights reserved.</Copyright>
        <UpdateInfo>Last updated: 2025.01.23</UpdateInfo>
      </BottomSection>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  background: ${(props) => props.theme.background.primary};
  border-top: 1px solid ${(props) => props.theme.border.divider};
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Section = styled(Stack)`
  margin: 20px 0;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${(props) => props.theme.text.primary};
  letter-spacing: -3px;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.text.tertiary};
  margin-bottom: 16px;
`;

const SubTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${(props) => props.theme.text.primary};
`;

const TechGrid = styled(Stack)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const TechItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${(props) => props.theme.text.tertiary};

  svg {
    width: 16px;
    height: 16px;
  }
`;

const LinkGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${(props) => props.theme.text.tertiary};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.text.tertiary};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.theme.border.primary};
  margin: 16px 0;
`;

const BottomSection = styled(Stack)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  flex: 1;
  width: 100%;
`;

const Version = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.text.tertiary};
`;

const Copyright = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.text.primary};
`;

const UpdateInfo = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.text.tertiary};
`;
