import { MODAL_PATH } from '@/constants';

export const isModalPath = (pathname: string) => {
  return MODAL_PATH.some((path) => pathname.startsWith(path));
};
