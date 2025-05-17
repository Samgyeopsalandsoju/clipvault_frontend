import { apiClient } from '@/shared/core/lib/axios';
import { APIResponse } from '@/shared/data/types';
import { IClip } from '@/shared/data/types/clip';
import { IClipForm, IModifyForm } from './model/types';

// 홈 클립 리스트 서비스 레이어
export const getCommunityClips = async () => {
  const res = await apiClient.get<APIResponse<IClip[]>>('/clips/public');
  return res.data.body;
};
// 커뮤니티 페이지에 내가 포크한 클립 id 리스트 가져오기
export const getForkedClipIds = async () => {
  const res = await apiClient.get<APIResponse<number[]>>('/forks/ids');
  return res.data.body;
};

// 유저 클립 리스트 가져오기
export const getUserClips = async () => {
  const res = await apiClient<APIResponse<IClip[]>>('/clips');
  return res.data.body;
};

// 클립 생성
export const createClip = async (data: IClipForm) => {
  const response = await apiClient.post<APIResponse<string>>('/clips/post', data);
  return response.data.body;
};

// 클립 수정
export const modifyClip = async (data: IModifyForm) => {
  const response = await apiClient.patch<APIResponse<string>>(`/clips/modify`, data);
  return response.data.body;
};

// 클립 단일 정보 가져오기
export const getClip = async (id: number) => {
  const response = await apiClient.get<APIResponse<IClip>>(`/clips/${id}`);
  return response.data.body;
};

// 클립 삭제
export const deleteClip = async (id: number) => {
  const response = await apiClient.delete<APIResponse<string>>(`/clips/${id}`);
  return response.data.body;
};
