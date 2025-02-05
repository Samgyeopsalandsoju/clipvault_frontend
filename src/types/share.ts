import { IClipResponse } from './clip';

export interface IShareLink {
  id: string;
  email: string;
  clips: IClipResponse[];
  createdBy: string;
  expiresAt: string;
}
