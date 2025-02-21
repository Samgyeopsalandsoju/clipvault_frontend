import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  onCancel: () => void;
  onAgree: () => void;
}

export const ConfirmModal = ({ setIsOpen, text, onCancel, onAgree }: ConfirmModalProps) => {
  return createPortal(
    <>
      <div
        className={classNames('fixed inset-0 bg-black bg-opacity-50', 'flex items-center justify-center z-[9999]')}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsOpen(false);
        }}
      >
        <div
          className={classNames(
            'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
            'w-[350px] h-[180px] border-solid border-[1px] dark:border-border-divider-dark',
            'rounded-xl flex flex-col justify-center items-center select-none gap-8 z-[9999]',
            'dark:bg-background-primary-dark p-3'
          )}
        >
          <p className="dark:text-text-primary-dark text-[1.3rem] text-center">{text}</p>
          <div className="flex gap-6">
            <button
              type="button"
              className={classNames(
                'dark:text-text-primary-dark px-6 border-solid border-[1px]',
                'p-2 rounded-[8px] dark:border-border-secondary-dark',
                'active:scale-[0.97] hover:dark:bg-background-secondary-dark'
              )}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={classNames(
                'dark:text-text-primary-dark px-6 border-solid border-[1px]',
                'p-2 rounded-[8px] dark:border-border-secondary-dark',
                'active:scale-[0.97] hover:dark:bg-background-secondary-dark'
              )}
              onClick={onAgree}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};
