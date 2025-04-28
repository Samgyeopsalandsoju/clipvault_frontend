export interface ICategory {
  name: string;
  color: string;
  id: string;
}
export interface ICategoryRequest extends ICategory {}

export interface ICategoryResponse extends ICategory {}
