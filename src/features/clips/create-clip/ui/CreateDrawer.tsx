import { Button } from '@/shared/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle } from '@/shared/ui/drawer';
import clsx from 'clsx';

export const CreateDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent
        className={clsx(
          'flex justify-center items-center m-auto w-[400px]',
          'md:w-[600px]',
          'lg:w-[800px]'
        )}
      >
        <DrawerHeader>
          <DrawerTitle>Create Clip</DrawerTitle>
        </DrawerHeader>
        <p>Drawer 내용...</p>
        <DrawerFooter>
          <Button onClick={onClose}>닫기</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
