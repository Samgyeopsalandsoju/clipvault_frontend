import { createToast } from '@/libs';

const toast = createToast();

export const generateUniqueId = () => {
  // 타임스탬프 + 랜덤 문자열 조합
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const normalizeInput = (value: string) => {
  return value.trim().toUpperCase();
};

export const handleCopy = async (shareLink: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(shareLink);
    toast.success('Link copied to clipboard!');
  } catch (error) {
    console.error('Failed to copy text:', error);
    toast.error('Unable to copy link');
  }
};

export const openInNewTab = (url: string) => {
  console.log('url', url);
  window.open(url, '_blank', 'noopener,noreferrer');
};
