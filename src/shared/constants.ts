export const STORAGE_KEYS = {
  REMEMBER_ME: 'clipVaultRememberMe',
} as const;

// social login option
export const SOCIAL_LOGIN_OPTIONS = {
  EMAIL: {
    provider: 'email',
    logo: '/images/email.png',
    text: 'Signup with Email',
  },
  GOOGLE: {
    provider: 'google',
    logo: '/images/google.png',
    text: 'Sign in with Google',
  },
  KAKAO: {
    provider: 'kakao',
    logo: '/images/kakao.png',
    text: 'Sign in with Kakao',
    bgColor: '#FAE300',
  },
};
