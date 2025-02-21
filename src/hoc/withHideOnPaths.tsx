import { usePathname } from 'next/navigation';

export const withHideOnPaths = (paths: string[]) => (Component: React.ComponentType) => {
  return function WithHideOnPaths(props: any) {
    const pathname = usePathname();
    if (paths.some((path) => pathname.startsWith(path))) return null;
    return <Component {...props} />;
  };
};
