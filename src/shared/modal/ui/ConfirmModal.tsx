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
        className={clsx('fixed inset-0 bg-black bg-opacity-50', 'flex items-center justify-center z-50')}
        onClick={(e) => {
          e.preventDefault();
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          className={clsx(
            'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-5 z-50',
            'rounded-xl flex flex-col justify-center items-center px-10 py-5',
            'bg-white'
          )}
        >
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold text-center">{title}</p>
            <p className="text-sm text-center">{content}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default" onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};
