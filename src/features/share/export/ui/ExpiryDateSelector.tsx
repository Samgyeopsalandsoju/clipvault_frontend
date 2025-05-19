'use client';

import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { formatTimestamp } from '@/shared/core/utils/date';

const EXPIRY_OPTIONS = [
  { label: '1d', value: 1 },
  { label: '3d', value: 3 },
  { label: '7d', value: 7 },
  { label: '14d', value: 14 },
  { label: '30d', value: 30 },
];

interface ExpiryDateSelectorProps {
  onSelect: ({ days, showingDue }: { days: string; showingDue: string }) => void;
  defaultValue?: string;
}

export const ExpiryDateSelector = ({ onSelect, defaultValue = '7' }: ExpiryDateSelectorProps) => {
  const [selectedDays, setSelectedDays] = useState<string>(defaultValue);
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [rawDate, setRawDate] = useState<string>('');

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
    setRawDate(formatTimestamp(date));
  }, [selectedDays]);

  // expiryDate가 업데이트 될 때마다 onSelect 호출 (마운트 시에도 적용됨)
  useEffect(() => {
    if (expiryDate) {
      onSelect({ days: rawDate, showingDue: selectedDays });
    }
  }, [expiryDate]);

  return (
    <div className={clsx('flex gap-2 rounded-[8px] p-2', 'border-solid border-[1px] h-[40px]')}>
      <div className="flex items-center justify-center hidden md:block">
        <Clock size={16} />
      </div>
      <select
        className="w-[15%] h-full text-xs md:text-base bg-inherit"
        value={selectedDays}
        onChange={(e) => {
          const {
            currentTarget: { value },
          } = e;
          setSelectedDays(value);
        }}
      >
        {EXPIRY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value} className="">
            {option.label}
          </option>
        ))}
      </select>
      <div className="h-full border-l-[1px] border-solid" />
      <div className="flex flex-1 select-none pl-[0.4rem] items-center text-xs md:text-base bg-inherit">
        Due: {expiryDate}
      </div>
    </div>
  );
};
