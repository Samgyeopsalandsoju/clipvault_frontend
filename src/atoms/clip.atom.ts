import { atom } from 'jotai';
import { ClipPopupType } from '../types/clip';

export const ClipPageOpenAtom = atom<boolean>(false);

export const clipPopupTypeAtom = atom<ClipPopupType>('detail');
