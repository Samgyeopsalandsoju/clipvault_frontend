import { Label } from '@/shared/ui/label';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/shared/ui/select';
import { useGetCategory } from '../hook/useGetCategory';
import { ICategorySelector } from '../model/type';

export const CategorySelector = ({ categoryId, onChange, disabled = false }: ICategorySelector) => {
  const { categories } = useGetCategory();

  return (
    <div className="grid gap-2">
      <Label htmlFor="visibility">카테고리 설정</Label>
      <Select value={categoryId ?? ''} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="카테고리 설정" />
        </SelectTrigger>
        <SelectContent>
          {categories &&
            categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};
