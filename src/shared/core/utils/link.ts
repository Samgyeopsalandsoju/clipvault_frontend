export const copyLink = (e: React.MouseEvent, url: string, onSuccess: () => void, onError: () => void) => {
  e.preventDefault();
  e.stopPropagation();
  navigator.clipboard.writeText(url).then(onSuccess).catch(onError);
};

// TODO: 실제 Url이 어떤 형식으로 사용되는지 확인 후
// 다시 체크
export const openInNewTab = (e: React.MouseEvent, url: string) => {
  e.stopPropagation();
  if (url.startsWith('https://')) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    window.open(`http://${url}`, '_blank', 'noopener,noreferrer');
  }
};
