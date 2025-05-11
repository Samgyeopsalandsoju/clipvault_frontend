import { IClip } from '@/shared/data/types';

export type IClipForm = Omit<IClip, 'id' | 'forkedCount'>;
