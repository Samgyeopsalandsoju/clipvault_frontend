'use client';

import { Stack } from '@mui/material';
import styled from 'styled-components';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

const EXPIRY_OPTIONS = [
  { label: '1d', value: 1 },
  { label: '3d', value: 3 },
  { label: '7d', value: 7 },
  { label: '14d', value: 14 },
  { label: '30d', value: 30 },
];

interface ExpiryDateSelectorProps {
  onSelect: (value: string) => void;
  defaultValue?: string;
}

export const ExpiryDateSelector = ({ onSelect, defaultValue = '7' }: ExpiryDateSelectorProps) => {
  const [selectedDays, setSelectedDays] = useState<string>(defaultValue);
  const [expiryDate, setExpiryDate] = useState<string>('');

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + Number(selectedDays));
    const formatted = date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\s/g, '');
    setExpiryDate(formatted);
  }, [selectedDays]);

  return (
    <Container>
      <ClockIcon>
        <Clock size={16} />
      </ClockIcon>
      <Selector
        value={selectedDays}
        onChange={(e) => {
          const {
            currentTarget: { value },
          } = e;
          setSelectedDays(value);
          onSelect(expiryDate);
        }}
      >
        {EXPIRY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Selector>
      <Divider />
      <DisplayExpiryDate>Due: {expiryDate}</DisplayExpiryDate>
    </Container>
  );
};

const Container = styled(Stack)`
  border: 1px solid ${(props) => props.theme.border.focus};
  gap: 8px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.background.secondary};
  height: 40px;
  flex-direction: row;
  padding: 0.5rem;
`;

const ClockIcon = styled(Stack)`
  align-items: center;
  justify-content: center;
  svg {
    color: ${(props) => props.theme.text.placeholder};
  }
`;

const Selector = styled.select`
  width: 15%;
  height: 100%;
  background-color: ${(props) => props.theme.background.secondary};
  color: ${(props) => props.theme.text.placeholder};
`;

const Divider = styled.div`
  border-left: 1px solid ${(props) => props.theme.border.focus};
  height: 100%;
`;

const DisplayExpiryDate = styled(Stack)`
  color: ${(props) => props.theme.text.primary};
  flex: 1;
  user-select: none;
  padding-left: 0.4rem;
`;
