import { ComponentType } from 'react';

export interface LoginFormValue {
  email: string;
  password: string;
}

export interface RegisterFormValue {
  email: string;
  password: string;
  confirmPassword: string;
  verifyCode: string;
}

export type FormType = 'login' | 'register';

export interface FormConfig {
  title: string;
  Components: ComponentType;
}
