import { Label } from '@/shared/ui/label';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/shared/ui/select';
import { ICategorySelector } from '../model/type';
import { ICategoryResponse } from '@/shared/types';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useGetCategory } from '@/features/category/category-list/hook/useGetCategory';

export const CategorySelector = ({ initialCategory, onChange, disabled = false }: ICategorySelector) => {
  const [selectedCategory, setSelectedCategory] = useState<ICategoryResponse | null>(initialCategory || null);
  const { categories, isLoading } = useGetCategory();

  // 선택된 카테고리 업데이트 ( 값 변경 시)
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // 외부 값 전달
  const handleChange = (value: string) => {
    const selected = categories.find((category) => category.id === value) || null;
    setSelectedCategory(selected);
    onChange(value);
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="visibility">카테고리 설정</Label>
      <Select value={selectedCategory?.id} onValueChange={handleChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="카테고리 설정" />
        </SelectTrigger>
        <SelectContent>
          {isLoading ? (
            <div className="flex justify-center p-2">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <>
              {categories.length === 0 ? (
                <SelectItem value="none">카테고리가 없습니다.</SelectItem>
              ) : (
                categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))
              )}
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
