import { Button } from '@/shared/ui/button';
import clsx from 'clsx';
import { createPortal } from 'react-dom';

export const ConfirmModal = ({
  onClose,
  title,
  onConfirm,
  content,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onConfirm: () => void;
}) => {
  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }} // 배경 클릭 시 닫기
      >
        {/* <div
          className="bg-white rounded-xl p-5 flex flex-col gap-4 relative"
          onClick={(e) => e.stopPropagation()} // 중요: 이벤트 전파 중지
        >
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold text-center">{title}</p>
            <p className="text-sm text-center">{content}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="cursor-pointer" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default" className="cursor-pointer" onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </div> */}
      </div>
    </>,
    document.body
  );
};
