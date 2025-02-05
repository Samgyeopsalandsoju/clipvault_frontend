export interface APIResponse<T> {
  result: T;
  message: string;
  status: string;
}
