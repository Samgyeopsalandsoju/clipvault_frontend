export interface APIResponse<T> {
  result: T;
  code: string;
  status: string;
}
