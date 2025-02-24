type URLValidationResult = { isValid: true } | { isValid: false; message: string };

export const isValidURLFormat = (url: string): URLValidationResult => {
  const urlPattern = /^(?:https?:\/\/)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?$/;

  if (!urlPattern.test(url)) {
    return {
      isValid: false,
      message: 'Invalid URL format.',
    };
  }

  return {
    isValid: true,
  };
};

export const checkProtocol = (url: string): URLValidationResult => {
  const protocolRegex = /^(https?:\/\/)/;

  if (!protocolRegex.test(url)) {
    return {
      isValid: false,
      message: 'Only links starting with http:// or https:// are allowed.',
    };
  }

  return {
    isValid: true,
  };
};

export const filterXSSInUrl = (url: string): URLValidationResult => {
  const decodedUrl = decodeURIComponent(url);
  // const xssPattern = /^(?!.*(?:<[^>]*>|javascript\s*:|data\s*:|vbscript\s*:|on\w+\s*=|eval\s*\(|expression\s*\()).*$/i;
  // XSS 위험 패턴 감지
  const xssPattern = /^(?!.*(?:<[^>]*>|javascript\s*:|data\s*:|vbscript\s*:|on\w+\s*=|eval\s*\(|expression\s*\()).*$/i;

  console.log('url', url);
  console.log('decodedUrl', decodedUrl);
  if (!xssPattern.test(decodedUrl)) {
    return {
      isValid: false,
      message: 'URL contains potentially malicious content.',
    };
  }
  return {
    isValid: true,
  };
};
export const normalizeUrl = (url: string) => {
  // 공백 제거
  let normalized = url.replace(/\s+/g, '');
  // 마지막 '/' 제거 (필요하면)
  normalized = normalized.replace(/\/$/, '');

  return normalized;
};
