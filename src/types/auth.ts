import { ComponentType } from 'react';

export interface LoginFormValue {
  mail: string;
  password: string;
}

export interface RegisterFormValue {
  mail: string;
  password: string;
  confirmPassword: string;
  verifyCode: string;
  verifiedMail: string;
}

export type FormType = 'login' | 'register';

export interface FormConfig {
  title: string;
  Components: ComponentType;
}
