export type TabType = 'clip' | 'fork';

export interface CurrentTabProps {
  currentTab: TabType;
  onTabChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ClipType {
  title: string;
  category: Category;
  link: string;
  fork: string;
  visible: string;
}

export interface Category {
  id?: string;
  name: string;
  color: string;
}

export type VisibilityType = 'private' | 'public';
