export interface APIResponse<T> {
  body: T;
  status: boolean;
}

// 성공 응답 타입 (문자열 성공 메시지 또는 리스트 데이터)
type SuccessResponse<T> = APIResponse<string | T> & { status: true };

// 실패 응답 타입
type ErrorResponse = APIResponse<{ code: string }> & { status: false };

export type APIResult<T> = SuccessResponse<T> | ErrorResponse;
