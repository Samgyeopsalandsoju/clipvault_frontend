import { Label, Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/shared/ui/shadcn';
import { IVisibilitySelector } from '../model/type';

export const VisibilitySelector = ({ value, onChange, disabled = false }: IVisibilitySelector) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="visibility">공개 범위 설정</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="범위 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="public">공개</SelectItem>
          <SelectItem value="private">비공개</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
