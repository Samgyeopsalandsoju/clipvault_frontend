import { atom } from 'jotai';
import { ClipPopupType, ICategory, IClipResponse, ICreateClip } from '../types/clip';

export const ClipPageOpenAtom = atom<boolean>(false);

export const clipAtom = atom<IClipResponse>();

export const clipListAtom = atom<IClipResponse[] | ICreateClip[]>([]);

export const categoryAtom = atom<ICategory | null>(null);

export const categoriesAtom = atom<ICategory[]>([]);

export const clipPopupTypeAtom = atom<ClipPopupType>('detail');
