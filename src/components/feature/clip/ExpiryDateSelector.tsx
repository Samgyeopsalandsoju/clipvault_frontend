'use client';

import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

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
    <div
      className={classNames(
        'flex gap-2 rounded-[8px] p-2 dark:bg-background-secondary-dark',
        'border-solid border-[1px] dark:border-border-focus-dark h-[40px]'
      )}
    >
      <div className="flex items-center justify-center">
        <Clock className="dark:text-text-placeholder-dark" size={16} />
      </div>
      <select
        className="w-[15%] h-full dark:text-text-placeholder-dark dark:bg-background-secondary-dark"
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
      </select>
      <div className="h-full border-l-[1px] border-solid dark:border-border-focus-dark" />
      <div className="flex flex-1 select-none pl-[0.4rem] dark:text-text-primary-dark">Due: {expiryDate}</div>
    </div>
  );
};
