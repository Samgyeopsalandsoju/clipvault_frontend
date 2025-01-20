import { atom } from 'jotai';
import { FormType } from './types';

// 로그인 모달 atom
export const ModalIsOpenAtom = atom<boolean>(false);

// 아이디 저장
export const RememberMeAtom = atom<boolean>(false);

// auth form 전환
export const ChangeFormAtom = atom<FormType>('login');
