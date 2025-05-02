export const copyLink = (
  e: React.MouseEvent,
  url: string,
  onSuccess: () => void,
  onError: () => void
) => {
  e.preventDefault();
  e.stopPropagation();
  navigator.clipboard.writeText(url).then(onSuccess).catch(onError);
};

export const openInNewTab = (e: React.MouseEvent, url: string) => {
  console.log('url', url);
  window.open(url, '_blank', 'noopener,noreferrer');
};
