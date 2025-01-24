import { FormType } from '@/types/auth';
import { atom } from 'jotai';

// 로그인 모달 atom
export const authModalAtom = atom<boolean>(false);

// 아이디 저장
export const rememberMeAtom = atom<boolean>(false);

// auth form 전환
export const authModeAtom = atom<FormType>('login');
