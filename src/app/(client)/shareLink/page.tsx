'use client';
import classNames from 'classnames';
import { Trash2, Copy, ExternalLink } from 'lucide-react';
import styled from 'styled-components';

const shareLink = () => {
  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="pb-4 pl-2">
        <p className="text-[0.9rem] select-none dark:text-text-placeholder-dark">
          Your clips, all neatly gathered here... take a look.
        </p>
      </div>
      <div className="gap-4">
        <div className="flex gap-[10px]">
          {/* <DeleteButton>
            <Trash2 size={16} />
          </DeleteButton> */}
          <input
            className={classNames(
              'flex flex-1 h-[40px] rounded-[8px] p-[10px] border dark:border-gray-600',
              'dark:text-text-primary-dark dark:bg-background-secondary-dark'
            )}
            readOnly
          />
          <button className="border-[1px] dark:border-border-secondary-dark rounded-[8px] p-[10px] dark:text-text-primary-dark dark:bg-background-secondary-dark active:scale-[0.97]">
            <Copy size={16} />
          </button>
          {/* <BlankButton>
            <ExternalLink size={16} />
          </BlankButton> */}
        </div>
      </div>
    </div>
  );
};

export default shareLink;

// const CopyButton = styled.button`
//   color: ${(props) => props.theme.text.primary};
//   border: 1px solid ${(props) => props.theme.border.focus};
//   background-color: ${(props) => props.theme.background.secondary};
//   border-radius: 8px;
//   padding: 10px;

//   &:active {
//     scale: 0.97;
//   }
// `;

// const BlankButton = styled.button`
//   color: ${(props) => props.theme.text.primary};
//   border: 1px solid ${(props) => props.theme.border.focus};
//   background-color: ${(props) => props.theme.background.secondary};
//   border-radius: 8px;
//   padding: 10px;
//   &:hover {
//     background-color: ${(props) => props.theme.background.secondary};
//   }

//   &:active {
//     scale: 0.97;
//   }
// `;
// const DeleteButton = styled.button`
//   color: #f44336;
//   border: 1px solid #f44336;
//   background-color: ${(props) => props.theme.background.secondary};
//   border-radius: 8px;
//   padding: 10px;
//   &:hover {
//     background-color: ${(props) => props.theme.background.secondary};
//   }

//   &:active {
//     scale: 0.97;
//   }
// `;
