export const openInNewTab = (url: string) => {
  console.log('url', url);
  window.open(url, '_blank', 'noopener,noreferrer');
};
