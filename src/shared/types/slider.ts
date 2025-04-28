export interface ISliderProps<T> {
  current: HTMLDivElement | null;
  GAP: number;
  SHOWN_COUNT: number;
  PADDING: number;
  renderItem: (item: T, cardWidth: number, cardHeight: number) => React.ReactNode;
  data: T[];
}
