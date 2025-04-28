import clsx from 'clsx';

function Tag({ name, background, text }: { name: string; background: string; text: string }) {
  return (
    <p
      className={clsx(
        'py-1 px-3 rounded-lg curser-point w-[8rem] truncate text-center font-semibold md',
        'sm:px-2.5 sm:text-sm sm:max-w-[6rem]',
        'md:max-w-[8rem]'
      )}
      style={{ background, color: text }}
    >
      {name}
    </p>
  );
}

export default Tag;
