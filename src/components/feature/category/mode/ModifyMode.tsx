import { Check, RefreshCcw, X } from 'lucide-react';
import { ChangeEvent, RefObject } from 'react';

interface ModifyModeProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeColor: () => void;
  onSave: () => void;
  onCancel: () => void;
  newName: string;
  text: string;
  border: string;
}

export const ModifyMode = ({
  inputRef,
  newName,
  onChangeName,
  onChangeColor,
  onSave,
  onCancel,
  text,
  border,
}: ModifyModeProps) => {
  return (
    <>
      <div
        className="dark:text-text-primary-dark select-none cursor-pointer active:rotate-180 transition-transform duration-200"
        style={{ color: text }}
        onClick={onChangeColor}
      >
        <RefreshCcw />
      </div>
      <input
        placeholder="new category"
        className="bg-transparent border-solid border-b border-0 w-[50%]"
        ref={inputRef}
        style={{
          color: text,
          borderColor: border,
        }}
        value={newName}
        onChange={onChangeName}
      />
      <div className="flex items-center gap-2">
        <Check onClick={onSave} className="text-green-500 cursor-pointer hover:scale-110 transition-transform" />
        <X onClick={onCancel} className="text-red-500 cursor-pointer hover:scale-110 transition-transform" />
      </div>
    </>
  );
};
