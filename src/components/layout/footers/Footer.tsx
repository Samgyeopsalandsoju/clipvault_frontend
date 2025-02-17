import { VERSION } from '@/constants';
import classNames from 'classnames';

export const Footer = () => {
  return (
    <footer
      className={classNames(
        'border-t dark:border-border-primary-dark rounded-bl-[18px] rounded-br-[18px]',
        'dark:bg-background-primary-dark fixed bottom-0 right-0 left-0 max-w-[478px] m-auto',
        'flex justify-center items-center flex-col pt-[10px] pb-[10px] h-[60px]',
        'dark:text-text-primary-dark'
      )}
    >
      <span className="text-[12px] dark:text-text-tertiary-dark">v{VERSION}</span>
      <span className="text-[12px] dark:text-text-primary-dark">© 2025 clipVault. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
