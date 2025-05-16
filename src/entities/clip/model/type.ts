import { IClip } from '@/shared/data/types';

// 퍼블릭 링크 엔트리 타입
export interface IClipEntry extends IClip {
  onClick?: () => void;
  isForked: boolean;
}

// 공개범위 셀렉터
export interface IVisibilitySelector {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}
