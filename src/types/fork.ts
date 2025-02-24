export interface IDoForkRequest {
  clipId: string;
  forkId?: string;
}

export interface IForkedClipResponse {
  id: string;
  categoryName: string;
  categoryColor: string;
  clipTitle: string;
  clipLink: string;
  clipId: string;
}
