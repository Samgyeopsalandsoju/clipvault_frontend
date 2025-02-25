interface StatCountProps {
  title: string;
  count: string;
}

export const StatCount = ({ title, count }: StatCountProps) => {
  return (
    <div className="text-center px-4 dark:text-text-primary-dark">
      <h1 className="text-xl font-semibold select-none">{title}</h1>
      <p className="font-semibold text-2xl select-none text-white text-shadow-cyan">{count}</p>
    </div>
  );
};
