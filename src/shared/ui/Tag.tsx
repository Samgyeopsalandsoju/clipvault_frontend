import clsx from 'clsx';

function Tag({ name, background, text }: { name: string; background: string; text: string }) {
  return (
    <p
      className={clsx(
        'py-1 px-1.5 text-xs rounded-lg curser-point w-[4rem] truncate text-center font-semibold',
        'md:px-5 md:text-sm md:w-[8rem]',
        'lg:text-base lg:w-[8rem]'
      )}
      style={{ background, color: text }}
    >
      {name}
    </p>
  );
}

export default Tag;
