import { IShareLink } from '@/features/share/shares/model/type';

export interface IShareRowEntry extends IShareLink {
  onDelete: ({ id, link }: { id: string; link: string }) => void;
}
