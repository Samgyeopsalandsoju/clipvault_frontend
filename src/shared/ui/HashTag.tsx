import { Button } from './button';

export const HashTag = ({ name }: { name: string }) => {
  return (
    <Button variant="link" className="underline">
      #{name}
    </Button>
  );
};
